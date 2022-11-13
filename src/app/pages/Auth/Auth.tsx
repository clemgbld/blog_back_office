import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../..";
import { login } from "../../../core/auth/use-cases/login";
import { ROUTES } from "../../routing/constants";

const Auth = () => {
  const emailInputEl = useRef(null);
  const passwordInput = useRef(null);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(
      login({
        email: emailInputEl.current.value,
        password: passwordInput.current.value,
      })
    );

    navigate(ROUTES.HOME);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailInputEl}
            required
            type="email"
            id="email"
            name="emailAuth"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInput}
            required
            type="password"
            id="password"
            name="passwordAuth"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Auth;
