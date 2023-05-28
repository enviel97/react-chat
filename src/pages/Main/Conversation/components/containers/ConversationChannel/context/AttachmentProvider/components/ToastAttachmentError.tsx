import { FC, memo } from "react";
import type { FileRejection, FileError } from "react-dropzone";
import styled from "styled-components";

interface ToastErrorProps {
  fileReject: FileRejection;
}
const Container = styled.div`
  color: ${({ theme }) => theme.disableColor};
  & > span {
    & > strong {
      font-size: 0.8em;
    }
    & > b {
      margin-left: 0.25em;
      color: ${({ theme }) => theme.onBackgroundColor};
    }
    font-weight: bold;
    font-size: 1em;
  }
  & > ul {
    margin-left: 1rem;
  }
`;

const ToastAttachmentError: FC<ToastErrorProps> = ({ fileReject }) => {
  return (
    <Container>
      <span>
        <strong>FILE:</strong>
        <b>{fileReject.file.name}</b>
      </span>
      <ul>
        {fileReject.errors.map(({ code, message }) => {
          const key = `${code}:${URL.createObjectURL(fileReject.file)}`;
          return <li key={key}>{message}</li>;
        })}
      </ul>
    </Container>
  );
};

export default memo(ToastAttachmentError);
