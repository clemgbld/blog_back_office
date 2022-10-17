import { FC } from "react";
import { LightMode } from "@styled-icons/material/LightMode";
import { DarkMode } from "@styled-icons/material/DarkMode";
import classNames from "./SwitchEditorTheme.module.scss";

type SwitchEditorThemeProps = {
  mode: "light-mode" | "dark-mode";
  onClick: () => void;
};

const SwitchEditorTheme: FC<SwitchEditorThemeProps> = ({ mode, onClick }) => (
  <div className={classNames.button} data-testid={mode} onClick={onClick}>
    {mode === "light-mode" ? <LightMode /> : <DarkMode />}
  </div>
);

export default SwitchEditorTheme;
