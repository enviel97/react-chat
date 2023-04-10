import { FC, memo } from "react";
import {
  EditableProfileFieldContainer,
  InputWrapper,
  LabelWrapper,
} from "./styles/EditableProfileField.decorate";

const EditableProfileField: FC<Props> = ({
  label,
  initialValue,
  placeholder,
  type = "text",
  maxLines = 2,
  ...props
}) => {
  return (
    <EditableProfileFieldContainer>
      <InputWrapper
        type={type}
        placeholder={placeholder}
        defaultValue={initialValue}
        {...(props as any)}
        {...(type === "textarea" && { rows: maxLines })}
      />
      <LabelWrapper itemType={type}>{label}</LabelWrapper>
    </EditableProfileFieldContainer>
  );
};

export default memo(EditableProfileField);
