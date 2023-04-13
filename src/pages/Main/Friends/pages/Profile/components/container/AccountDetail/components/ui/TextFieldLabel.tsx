import { clampSize } from "@theme/helper/tools";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  value: string;
}

const TextFieldContainer = styled.span`
  white-space: nowrap;
  font-size: ${clampSize({
    minFontSize: 1,
    maxFontSize: 1.2,
    minWidth: 224,
    maxWidth: 1697.61,
  })};
  & > strong {
    color: ${({ theme }) => theme.disableColor};
    margin-right: 1rem;
    font-size: ${clampSize({
      minFontSize: 0.8,
      maxFontSize: 1,
      minWidth: 224,
      maxWidth: 1697.61,
    })};
  }
  & > span {
    border-bottom: 2px solid ${({ theme }) => theme.onBackgroundColor};
  }
`;

const TextField: FC<Props> = ({ label, value }) => {
  return (
    <TextFieldContainer>
      <strong>{label}.</strong>
      <span>{value}</span>
    </TextFieldContainer>
  );
};

export default TextField;
