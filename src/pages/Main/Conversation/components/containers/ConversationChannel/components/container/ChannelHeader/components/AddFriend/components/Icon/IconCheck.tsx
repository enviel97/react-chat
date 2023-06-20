import { memo } from "react";
import styled from "styled-components";

const IconCheckSvg = styled.svg.attrs({
  viewBox: "0 0 512 512",
  xmlns: "http://www.w3.org/2000/svg",
})`
  stroke: var(--black);
  fill: var(--white);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 32;
  height: 1.25em;
  width: 1.25em;
`;

const IconCheck = () => {
  return (
    <IconCheckSvg>
      <path
        d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 
        0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 
        432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 
        9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 
        9.997-36.204-.001z'
      />
    </IconCheckSvg>
  );
};

export default memo(IconCheck);
