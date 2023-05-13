interface TextFieldProps {
  className?: string;
  id?: string;
  initValue?: string;
  type?: "text" | "number" | "password" | "rich";
  label?: string;
  security?: boolean;
  height?: string;
  width?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  fontSize?: string;
  tabIndex?: number;
  maxLines?: number;
  autoFocus?: boolean;

  // color
  borderColor?: string;
  filled?: string;

  register?: any;
  errorMess?: string;
  onChanged?: (value: string) => void;
}
