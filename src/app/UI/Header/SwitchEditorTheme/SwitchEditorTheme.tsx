import { FC } from "react";
import { LightMode } from "@styled-icons/material/LightMode";
import { DarkMode } from "@styled-icons/material/DarkMode";
import { EDITOR_THEME_MODE } from "./constants";
import classNames from "./SwitchEditorTheme.module.scss";

type SwitchEditorThemeProps = {
  mode: "light-mode" | "dark-mode";
  onClick: () => void;
};

const SwitchEditorTheme: FC<SwitchEditorThemeProps> = ({ mode, onClick }) => (
  <div className={classNames.button} data-testid={mode} onClick={onClick}>
    {mode === EDITOR_THEME_MODE.LIGHT ? <LightMode /> : <DarkMode />}
  </div>
);

export default SwitchEditorTheme;
