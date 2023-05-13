import string from "@utils/string";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { TbEye, TbEyeOff, TbLock } from "react-icons/tb";
import { Eyes, FloatingLabel, LockIcon } from "../decorate/base";

interface BaseTextFieldProps extends TextFieldProps {
  disableFloatingLabel?: boolean;
}

const BaseTextField = (props: BaseTextFieldProps) => {
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
    disableFloatingLabel = false,
    placeholder,
    autoFocus,
    maxLines = 2,
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
  const _label = label ?? props.register?.name ?? "Label";

  const _placeHolder = disableFloatingLabel ? _label : placeholder;

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
          placeholder={_placeHolder}
          defaultValue={initValue}
          onChange={_onChange}
          readOnly={readOnly}
          disabled={disabled || readOnly}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          rows={maxLines}
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
          placeholder={_placeHolder}
          defaultValue={initValue}
          onChange={_onChange}
          readOnly={readOnly}
          disabled={disabled || readOnly}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          required
          {...props.register}
        />
      )}

      {!disableFloatingLabel && <label htmlFor={id}>{_label}</label>}
      {security && (
        <Eyes onClick={() => setHidden((prev) => !prev)}>
          {isHidden ? <TbEye /> : <TbEyeOff />}
        </Eyes>
      )}
    </FloatingLabel>
  );
};

export default memo(BaseTextField);
