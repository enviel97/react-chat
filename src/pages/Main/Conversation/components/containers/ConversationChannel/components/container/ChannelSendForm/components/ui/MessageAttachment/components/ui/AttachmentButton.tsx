import useAttachment from "@pages/Main/Conversation/components/containers/ConversationChannel/hooks/useAttachments";
import { colorBrightness } from "@theme/helper/tools";
import { FC, memo } from "react";
import { TiAttachmentOutline } from "react-icons/ti";
import styled, { css } from "styled-components";

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
  const { open } = useAttachment();

  return (
    <ButtonContainer onClick={open}>
      <TiAttachmentOutline size={"2rem"} />
    </ButtonContainer>
  );
};

export default memo(AttachmentButton);
