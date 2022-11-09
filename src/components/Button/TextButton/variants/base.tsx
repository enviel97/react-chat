const Button = (props: ButtonTextProps) => {
  const { text, disabled, onClick, type = "button", ...prop } = props;
  // core button event
  return (
    <button {...prop} type={type} onClick={onClick} disabled={disabled}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
