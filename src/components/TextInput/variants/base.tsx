import string from "@utils/string";
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
    filled,
    borderColor,
    fontSize,
    tabIndex = 0,
  } = props;
  const ref = useRef<any>();
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    if (!!initValue && !!ref.current?.value && !!readOnly) {
      ref.current.value = initValue;
    }
  }, [initValue, ref, readOnly]);

  const _onChange = (event: ChangeEvent<any>) => {
    props.onChanged && props.onChanged(event.target.value);
  };

  return (
    <FloatingLabel
      className={string.classList("textField", props.className)}
      filled={filled}
      height={height}
      width={width}
      borderColor={borderColor}
      fontSize={fontSize}
    >
      {(disabled || readOnly) && (
        <LockIcon className='lock'>
          <TbLock />
        </LockIcon>
      )}
      {props.type === "rich" ? (
        <textarea
          className={props.className}
          ref={ref}
          id={id}
          name={id}
          placeholder={props.placeholder ?? " "}
          defaultValue={initValue}
          onChange={_onChange}
          readOnly={readOnly}
          disabled={disabled || readOnly}
          tabIndex={tabIndex}
          required
          {...props.register}
        />
      ) : (
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
          tabIndex={tabIndex}
          required
          {...props.register}
        />
      )}

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
