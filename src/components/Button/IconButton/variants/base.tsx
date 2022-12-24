const Button = (props: ButtonIconProps) => {
  const { icon, disabled, onClick, type = "button", itemType } = props;
  return (
    <button
      itemType={itemType}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default Button;
