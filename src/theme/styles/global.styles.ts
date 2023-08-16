import { clampSize, neumorphismBoxShadowInset } from "@theme/helper/tools";
import { createGlobalStyle } from "styled-components";
import { breakpoint } from "../helper/breakpoint";
import { typography } from "../helper/typography";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font: inherit;
  }
  :root {
    --black: ${({ theme }) => theme.black};
    --white: ${({ theme }) => theme.white};
    --gray: ${({ theme }) => theme.gray};
    
    --primary-color: ${({ theme }) => theme.primaryColor};
    --on-primary-color: ${({ theme }) => theme.onPrimaryColor};

    --secondary-color: ${({ theme }) => theme.secondaryColor};
    --on-secondary-color: ${({ theme }) => theme.onSecondaryColor};

    --tertiary-color: ${({ theme }) => theme.tertiaryColor};
    --on-tertiary-color: ${({ theme }) => theme.onTertiaryColor};

    --background-color: ${({ theme }) => theme.backgroundColor};
    --on-background-color: ${({ theme }) => theme.onPrimaryColor};

    --surface-color: ${({ theme }) => theme.surfaceColor};
    --on-surface-color: ${({ theme }) => theme.onSurfaceColor};

    --notification-color: ${({ theme }) => theme.notificationColor};
    --on-notification-color: ${({ theme }) => theme.onNotificationColor};

    --error-color: ${({ theme }) => theme.errorColor};
    --disable-color: ${({ theme }) => theme.disableColor};
    --success-color: ${({ theme }) => theme.successColor};
    --warning-color: ${({ theme }) => theme.disableColor};
  }
 
  html {
    height: 100%;
    /* resize */ 
    font-size: 100%;
    ${breakpoint.down("desktop")} {
      font-size: 80%;
    }
    
    ${breakpoint.down("laptop")} {
      font-size: 70%;
    }
    ${breakpoint.down("tablet")} {
      font-size: 62.5%;
    }
    
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%; 
    &:focus-within{
      scroll-behavior: smooth;
    }
  }

  body {
    position: relative;
    user-select: none;
    background-color: ${({ theme }) => theme.backgroundColor};
    color:  ${({ theme }) => theme.onBackgroundColor};

    /* Typography */
    text-rendering: optimizeSpeed;
    font-weight: 400;
    line-height: 1.5; 
    font-family: ${typography.fontFamily.regular};
    font-size: 16px;

    /* Sized */
    min-width: 100%;
    min-height: 0;
    overflow: hidden;
  }

  *::-webkit-scrollbar {
    border: none;
    outline: none;
    width: 0.8em;
    height: 0.8em;
    background: ${({ theme }) => theme.backgroundColor};
    border-radius: inherit;
    &:horizontal {
      background-color: ${({ theme }) => theme.surfaceColor};
    }
    
    &-track {
      box-shadow: ${({ theme }) =>
        neumorphismBoxShadowInset(true, {
          background: theme.backgroundColor,
        })}; 
      border-radius: inherit;
    }
    &-thumb {
      border: 1px solid #000000;
      background-color: ${({ theme }) => theme.surfaceColor};
      box-shadow: 
        inset -5px -5px 5px #0d0d0d,
        inset 10px 10px 20px ${({ theme }) => theme.surfaceColor} ;
      
      border-radius: inherit;
      &:hover {
        background-color: ${({ theme }) => theme.surfaceColor};
        box-shadow: inset -4px -4px 4px #0d0d0d;
      }
    }
  }

  svg {
    shape-rendering: geometricPrecision;
    text-rendering: geometricPrecision;
    fill-rule: evenodd;
    clip-rule: evenodd;
  }

  img, picture, svg {
    height: 100%;
    max-width: 100%;
    display: block;
  }

  img {
    object-fit: contain;
    object-position: center;
    border-radius: inherit;
  }
  
  p { font-size: 1rem; margin-bottom: 2rem; }

  h1, h2, h3, h4, h5 {
    font-weight: 500;
    line-height: 1.3;
  }
  

  h1 {font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 3.052,
    minFontSize: 2.5433,
  })};}

  h2 {font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 2.441,
    minFontSize: 2.034167,
  })};}

  h3 {font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 1.953,
    minFontSize: 1.6275,
  })};}

  h4 {font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 1.563,
    minFontSize: 1.3025,
  })};}

  h5 {font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 1.25,
    minFontSize: 1.04167,
  })};}
  
  small, caption {
    font-size: ${clampSize({
      maxWidth: 1980,
      minWidth: 320,
      maxFontSize: 0.85,
      minFontSize: 0.6,
    })};
    padding-top: 0.5em;
  }

  
  button {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  
  a {
    cursor: pointer;
    text-decoration: none;
    font-size: 0.9em;
    color: ${({ theme }) => theme.disableColor};
    & strong {
      color: ${({ theme }) => theme.secondaryColor};
    }
  }

  span {
    font-size: inherit;
  }

  input { 
    color: inherit; 
    font-size: 1em;
    &:focus {
      inset: none;
      border: none;
      outline: none;
    } 
    &[type="search"]::-webkit-search-cancel-button {
      background-color: transparent;
      outline: none;
      border: none;
      border-radius: 50%;
      filter: grayscale(80%);
    }
  }

  #root {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }

  #tooltip {
    z-index: 2147483647;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
