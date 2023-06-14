// Import Swiper styles
import { createGlobalStyle } from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// variable
const SwiperGlobalStyles = createGlobalStyle`
  :root {
    --swiper-theme-color: ${({ theme }) => theme.backgroundColor};
    --swiper-pagination-bullet-inactive-color: ${({ theme }) =>
      theme.surfaceColor};
  }
`;

export default SwiperGlobalStyles;
