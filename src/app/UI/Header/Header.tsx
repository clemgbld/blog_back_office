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
import { Logout } from "@styled-icons/material/Logout";
import classNames from "./Header.module.scss";
import { UI_TO_DOMAIN_STATE_MAPPING } from "./header-constants";

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
        {[ROUTES.HOME, ROUTES.EMAILS].includes(pathname) && (
          <input
            placeholder="search"
            className={classNames.nav_search}
            type="text"
            onChange={({ target: { value } }) =>
              dispatch(
                updateSearchTerms({
                  type: UI_TO_DOMAIN_STATE_MAPPING[pathname],
                  searchTerms: value,
                })
              )
            }
          />
        )}
        {![ROUTES.HOME, ROUTES.EMAILS].includes(pathname) &&
          isEditorInLightMode && (
            <SwitchEditorTheme
              mode={EDITOR_THEME_MODE.LIGHT}
              onClick={() => dispatch(toggleEditorTheme())}
            />
          )}
        {![ROUTES.HOME, ROUTES.EMAILS].includes(pathname) &&
          !isEditorInLightMode && (
            <SwitchEditorTheme
              mode={EDITOR_THEME_MODE.DARK}
              onClick={() => dispatch(toggleEditorTheme())}
            />
          )}
        <div className={classNames.nav__right}>
          {[ROUTES.HOME, ROUTES.EMAILS].includes(pathname) && (
            <Link className={classNames.nav__link} to={ROUTES.CREATE}>
              Create an article
            </Link>
          )}
          {[ROUTES.HOME, ROUTES.CREATE].includes(pathname) && (
            <Link className={classNames.nav__link} to={ROUTES.EMAILS}>
              Emails
            </Link>
          )}
          <button className={classNames.nav__button} onClick={logoutHandler}>
            <Logout />
          </button>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Header;
