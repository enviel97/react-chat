import { InputFile } from "@components/Input";
import { FileInputRef } from "@components/Input/variants/FileInput";
import { colorBrightness } from "@theme/helper/tools";
import { FC, memo, MouseEventHandler, useCallback, useRef } from "react";
import { TiAttachmentOutline } from "react-icons/ti";
import styled, { css } from "styled-components";
import useAttachment from "../../hooks/useAttachment";

interface AttachmentButtonProps {}

const ButtonContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.5em;
  aspect-ratio: 1 / 1;
  cursor: pointer;

  padding: 0.5em;
  ${({ theme }) => {
    const onMain = theme.disableColor;
    const main = theme.backgroundColor;
    const dark = colorBrightness(theme.backgroundColor, -10);
    const light = colorBrightness(theme.backgroundColor, 8);
    return css`
      color: ${onMain};
      background-color: ${main};
      box-shadow: 0.25em 0.25em 0.75em ${dark}, -0.25em -0.25em 0.75em ${light};
    `;
  }}

  &:hover > svg {
    scale: 1.1;
  }

  &:active > svg {
    scale: 0.98;
  }
`;

const AttachmentButton: FC<AttachmentButtonProps> = () => {
  const ref = useRef<FileInputRef>(null);
  const { addAttachments } = useAttachment();

  const _handleOnClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!ref.current) return;
    ref.current.onOpenBrowser();
  };

  const _handleSelectedFile = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      addAttachments({ files: files });
    },
    [addAttachments]
  );

  return (
    <ButtonContainer onClick={_handleOnClick}>
      <TiAttachmentOutline size={"2rem"} />
      <InputFile
        selectedFile={_handleSelectedFile}
        ref={ref}
        multiple
        allowSelectDuplicate
      />
    </ButtonContainer>
  );
};

export default memo(AttachmentButton);
