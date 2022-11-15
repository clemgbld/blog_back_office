import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../..";
import { updateSearchTerms } from "../../../core/UI/use-cases/update-search-terms";
import { toggleEditorTheme } from "../../../core/UI/use-cases/toggle-theme";
import { logout } from "../../../core/auth/use-cases/logout";
import SwitchEditorTheme from "./SwitchEditorTheme/SwitchEditorTheme";
import { EDITOR_THEME_MODE } from "./SwitchEditorTheme/constants";
import { ROUTES } from "../../routing/constants";
import classNames from "./Header.module.scss";

type HeaderProps = {
  children: JSX.Element;
};

const Header: FC<HeaderProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate(ROUTES.AUTH);
  };

  return (
    <>
      <nav className={classNames.nav}>
        <div role="complementary" onClick={() => navigate("/")}>
          <img
            className={classNames.nav_img}
            src="/app-logo.png"
            alt="logo app"
          />
        </div>
        {pathname === ROUTES.HOME && (
          <input
            placeholder="search"
            className={classNames.nav_search}
            type="text"
            onChange={({ target: { value } }) =>
              dispatch(updateSearchTerms(value))
            }
          />
        )}
        {pathname !== ROUTES.HOME && isEditorInLightMode && (
          <SwitchEditorTheme
            mode={EDITOR_THEME_MODE.LIGHT}
            onClick={() => dispatch(toggleEditorTheme())}
          />
        )}
        {pathname !== ROUTES.HOME && !isEditorInLightMode && (
          <SwitchEditorTheme
            mode={EDITOR_THEME_MODE.DARK}
            onClick={() => dispatch(toggleEditorTheme())}
          />
        )}

        {pathname === ROUTES.HOME && (
          <Link className={classNames.nav__link} to="/create">
            Create an article
          </Link>
        )}
        <button onClick={logoutHandler}>Logout</button>
      </nav>
      {children}
    </>
  );
};

export default Header;
