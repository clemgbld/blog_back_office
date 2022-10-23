import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../..";
import { updateSearchTerms } from "../../../core/UI/use-cases/update-search-terms";
import { toggleEditorTheme } from "../../../core/UI/use-cases/toggle-theme";
import SwitchEditorTheme from "./SwitchEditorTheme/SwitchEditorTheme";
import { EDITOR_THEME_MODE } from "./SwitchEditorTheme/constants";
import classNames from "./Header.module.scss";

type HeaderProps = {
  children: JSX.Element;
};

const Header: FC<HeaderProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  const isEditorInLightMode = useSelector<RootState, boolean>(
    ({ ui: { isEditorInLightMode } }) => isEditorInLightMode
  );

  return (
    <>
      <nav className={classNames.nav}>
        <div>
          <img
            className={classNames.nav_img}
            src="/app-logo.png"
            alt="logo app"
          />
        </div>
        <input
          placeholder="search"
          className={classNames.nav_search}
          type="text"
          onChange={({ target: { value } }) =>
            dispatch(updateSearchTerms(value))
          }
        />
        {isEditorInLightMode ? (
          <SwitchEditorTheme
            mode={EDITOR_THEME_MODE.LIGHT}
            onClick={() => dispatch(toggleEditorTheme())}
          />
        ) : (
          <SwitchEditorTheme
            mode={EDITOR_THEME_MODE.DARK}
            onClick={() => dispatch(toggleEditorTheme())}
          />
        )}
      </nav>
      {children}
    </>
  );
};

export default Header;
