import { FC } from "react";
import classNames from "./Title.module.scss";

type TitleProps = {
  title: string;
};

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <h1 className={classNames.title}>
      <span className={classNames["title_three-d"]}>{title[0]}</span>
      {title.slice(1)}
    </h1>
  );
};

export default Title;
