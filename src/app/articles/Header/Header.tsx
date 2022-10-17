import { FC } from "react";
import classNames from "./Header.module.scss";

type HeaderProps = {
  children: JSX.Element;
};

const Header: FC<HeaderProps> = ({ children }) => {
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
      </nav>
      {children}
    </>
  );
};

export default Header;
