import { FC } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const AttachmentHintContainer = styled(Tooltip)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

const AttachmentHintInfo = styled.span`
  font-weight: normal;
  color: ${({ theme }) => theme.disableColor};
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  & strong {
    font-weight: bold;
    color: ${({ theme }) => theme.onSurfaceColor};
  }
`;
interface AttachmentHintProps {
  selector: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
const AttachmentHint: FC<AttachmentHintProps> = ({
  selector,
  fileName,
  fileType,
  fileSize,
}) => {
  return (
    <AttachmentHintContainer
      anchorSelect={selector}
      place='top'
      id='tooltip'
      delayShow={600}
    >
      <AttachmentHintInfo>
        name: <strong>{fileName}</strong>
      </AttachmentHintInfo>
      <AttachmentHintInfo>
        type: <strong>{fileType}</strong>
      </AttachmentHintInfo>
      <AttachmentHintInfo>
        size: <strong>{fileSize.toNormalSize()}</strong>
      </AttachmentHintInfo>
    </AttachmentHintContainer>
  );
};

export default AttachmentHint;
