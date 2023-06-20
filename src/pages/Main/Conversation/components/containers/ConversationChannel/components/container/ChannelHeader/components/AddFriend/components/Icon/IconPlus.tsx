import { memo } from "react";
import styled from "styled-components";

const IconPlusSvg = styled.svg.attrs({
  version: "1.2",
  baseProfile: "tiny",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
})`
  stroke: var(--black);
  fill: var(--white);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
  height: 1.4em;
  width: 1.4em;
`;

const IconPlus = () => {
  return (
    <IconPlusSvg>
      <path
        d='M18 10h-4v-4c0-1.104-.896-2-2-2s-2 .896-2 2l.071 4h-4.071c-1.104 
        0-2 .896-2 2s.896 2 2 2l4.071-.071-.071 4.071c0 1.104.896 2 2 2s2-.896 
        2-2v-4.071l4 .071c1.104 0 2-.896 2-2s-.896-2-2-2z'
      />
    </IconPlusSvg>
  );
};

export default memo(IconPlus);
