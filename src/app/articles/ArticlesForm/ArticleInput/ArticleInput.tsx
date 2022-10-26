import { FC } from "react";
import classNames from "./ArticleInput.module.scss";

type ArticleInputProps = {
  isRequired?: boolean;
  id: string;
  onChange: ({
    target: { name, value },
  }: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  label: string;
  value: string;
};

const ArticleInput: FC<ArticleInputProps> = ({
  isRequired = false,
  id,
  onChange,
  label,
  value,
}) => {
  return (
    <div className={classNames["input-container"]}>
      <label
        className={classNames["input-container_label"]}
        htmlFor="description"
      >
        {label}
      </label>
      <input
        value={value}
        className={classNames["input-container_input"]}
        required={isRequired}
        id={id}
        name={id}
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

export default ArticleInput;
