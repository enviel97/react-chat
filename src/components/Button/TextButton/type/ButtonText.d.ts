interface ButtonDecorate {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
  size?: string;
  textColor?: string;
}

interface ButtonTextProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
