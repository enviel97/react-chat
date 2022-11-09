const Button = (props: ButtonIconProps) => {
  const { icon, disabled, onClick, type = "button" } = props;
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
};

export default Button;
