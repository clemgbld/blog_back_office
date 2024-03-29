import { useRef, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../..";
import { login } from "../../../core/auth/use-cases/login";
import { resetError } from "../../../core/auth/auth-slice";
import { ROUTES } from "../../routing/constants";
import WithNotificationError from "../../UI/notification/WithNotificationError";
import Title from "../../UI/Title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classNames from "./Auth.module.scss";

const Auth = () => {
  const emailInputEl = useRef<HTMLInputElement>(null);

  const passwordInputEl = useRef<HTMLInputElement>(null);

  const errorMessage = useSelector(({ auth: { error } }: RootState) => error);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(
      login({
        email: emailInputEl.current?.value || "",
        password: passwordInputEl.current?.value || "",
      })
    );

    navigate(ROUTES.HOME);
  };

  const resetErrorMessage = () => {
    dispatch(resetError());
  };

  return (
    <WithNotificationError
      resetErrorMessage={resetErrorMessage}
      errorMessage={errorMessage}
    >
      <div data-testid="auth" className="page_form-layout">
        <Title title="Authentification" />
        <div className={classNames.box}>
          <form onSubmit={submitHandler}>
            <Input
              refEl={emailInputEl}
              isRequired
              type="email"
              id="email"
              label="Email"
            />
            <Input
              refEl={passwordInputEl}
              isRequired
              type="password"
              id="password"
              label="Password"
            />
            <div className={classNames["button-container"]}>
              <Button
                className={classNames.button}
                label="Login"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </WithNotificationError>
  );
};

export default Auth;
