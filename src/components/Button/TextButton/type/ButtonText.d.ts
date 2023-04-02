interface ButtonDecorate {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
  size?: string;
  textColor?: string;
  highlightColor?: string;
}

interface ButtonTextProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
