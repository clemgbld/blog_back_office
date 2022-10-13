import { FC } from "react";
import classNames from "./Header.module.scss";

type HeaderProps = {
  children: JSX.Element;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <nav className={classNames.nav}></nav>
      {children}
    </>
  );
};

export default Header;
