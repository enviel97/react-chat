import { memo } from "react";
import styled from "styled-components";

const IconPendingSvg = styled.svg.attrs({
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
})`
  fill: none;
  stroke: var(--black);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  height: 1.25em;
  width: 1.25em;
`;

const IconPendingBackground = styled.path`
  fill: var(--white);
  stroke-width: 1;
`;

const IconPending = () => {
  return (
    <IconPendingSvg>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <IconPendingBackground
        d='M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 
        0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 
        1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 
        -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 
        1 0 0 0 -.993 -.883z'
      />
    </IconPendingSvg>
  );
};

export default memo(IconPending);
