interface TextFieldProps {
  className?: string;
  id?: string;
  initValue?: string;
  type?: "text" | "number" | "password";
  label?: string;
  security?: boolean;
  height?: string;
  width?: string;
  placeholder?: string;
  filled?: string;
  readOnly?: boolean;
  disabled?: boolean;

  register?: any;
  errorMess?: string;
  onChanged?: (value: string) => void;
}
