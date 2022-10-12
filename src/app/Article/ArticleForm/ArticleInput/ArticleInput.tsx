import { FC } from "react";

type ArticleInputProps = {
  isRequired: boolean;
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
};

const ArticleInput: FC<ArticleInputProps> = ({
  isRequired = false,
  id,
  onChange,
  label,
}) => {
  return (
    <div>
      <label htmlFor="description">{label}</label>
      <input
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
