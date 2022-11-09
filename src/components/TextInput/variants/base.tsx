import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { TbEye, TbEyeOff, TbLock } from "react-icons/tb";
import { Eyes, FloatingLabel, LockIcon } from "../decorate/base";

const BaseTextField = (props: TextFieldProps) => {
  const {
    id,
    initValue,
    label,
    security = false,
    height = "fit-content",
    width = "100%",
    readOnly = false,
    disabled = false,
  } = props;
  const ref = useRef<HTMLInputElement>();
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    if (!!initValue && !!ref.current?.value && !!readOnly) {
      ref.current.value = initValue;
    }
  }, [initValue, ref, readOnly]);

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChanged && props.onChanged(event.target.value);
  };

  return (
    <FloatingLabel className={props.className} height={height} width={width}>
      {(disabled || readOnly) && (
        <LockIcon className='lock'>
          <TbLock />
        </LockIcon>
      )}
      <input
        className={props.className}
        ref={ref}
        type={props.type || (security && isHidden ? "password" : "text")}
        id={id}
        name={id}
        placeholder={props.placeholder ?? " "}
        defaultValue={initValue}
        onChange={_onChange}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        required
        {...props.register}
      />
      <label htmlFor={id}>{label ?? props.register?.name ?? "Label"}</label>
      {security && (
        <Eyes onClick={() => setHidden((prev) => !prev)}>
          {isHidden ? <TbEye /> : <TbEyeOff />}
        </Eyes>
      )}
    </FloatingLabel>
  );
};

export default memo(BaseTextField);
