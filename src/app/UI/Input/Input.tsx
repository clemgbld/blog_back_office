import React, { FC, SyntheticEvent } from "react";
import classNames from "./Input.module.scss";

type InputProps = {
  isRequired?: boolean;
  id: string;
  onChange?: (e: SyntheticEvent) => void;
  label: string;
  value?: string;
  type?: string;
  refEl?: React.MutableRefObject<any>;
};

const Input: FC<InputProps> = ({
  isRequired = false,
  id,
  onChange,
  label,
  value = undefined,
  type = "text",
  refEl,
}) => {
  return (
    <div className={classNames["input-container"]}>
      <label className={classNames["input-container_label"]} htmlFor={id}>
        {label}
      </label>
      {refEl ? (
        <input
          className={classNames["input-container_input"]}
          required={isRequired}
          id={id}
          name={id}
          type={type}
          ref={refEl}
        />
      ) : (
        <input
          value={value}
          className={classNames["input-container_input"]}
          required={isRequired}
          id={id}
          name={id}
          type={type}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
