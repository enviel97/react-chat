import { FC, memo } from "react";

const Input: FC<SubProps> = ({ type, register, ...props }) => {
  if (type === "text")
    return <input {...(props as BaseInputProps)} type={type} {...register} />;
  return (
    <textarea {...(props as BaseTextareaProps)} type='text' {...register} />
  );
};

export default memo(Input);
