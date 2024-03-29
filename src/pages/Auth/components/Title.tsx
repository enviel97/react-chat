import { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const WrapperTitle = styled.h1`
  position: relative;
  font-weight: bold;
  & span {
    color: ${({ theme }) => theme.onBackgroundColor};
    text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
      0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
      0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
      0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
      0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
      0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Title: FC<Props> = ({ title }) => {
  return (
    <WrapperTitle>
      {title.split("").map((c, index) => {
        return <span key={index}>{c}</span>;
      })}
    </WrapperTitle>
  );
};

export default Title;
