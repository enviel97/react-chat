import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import { TbInfoCircle } from "react-icons/tb";
import {
  EditableProfileFieldContainer,
  ErrorMessage,
  InputWrapper,
  LabelWrapper,
} from "./styles/EditableProfileField.decorate";

const EditableProfileField: FC<Props> = ({
  label,
  initialValue,
  placeholder,
  type = "text",
  maxLines = 2,
  errorMessage,
  ...props
}) => {
  return (
    <EditableProfileFieldContainer>
      <InputWrapper
        id={label}
        type={type}
        placeholder={placeholder}
        defaultValue={initialValue}
        {...(props as any)}
        {...(type === "textarea" && { rows: maxLines })}
      />
      <LabelWrapper itemType={type} htmlFor={label}>
        {label}
      </LabelWrapper>

      <AnimatePresence>
        {errorMessage && (
          <ErrorMessage
            role='alert'
            variants={{
              in: { x: 0, y: 0, opacity: 1 },
              out: { x: 0, y: 0, opacity: 0 },
            }}
            initial='out'
            animate='in'
            exit='out'
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <TbInfoCircle key={`${label}-ico`} strokeWidth={"2px"} />
            <small key={`${label}-notice`} className='mess'>
              {errorMessage}
            </small>
          </ErrorMessage>
        )}
      </AnimatePresence>
    </EditableProfileFieldContainer>
  );
};

export default memo(EditableProfileField);
