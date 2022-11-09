import { neumorphismBoxShadowInset } from "@common/helper/tools";
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

  *::-webkit-scrollbar {
    border: none;
    outline: none;
    width: 0.8em;
    background: ${({ theme }) => theme.backgroundColor};
    
    &-track {
      box-shadow: ${({ theme }) =>
        neumorphismBoxShadowInset(true, {
          background: theme.backgroundColor,
        })}; 
      border-radius: 10px;
    }
    &-thumb {
      border: 1px solid #000000;
      background-color: ${({ theme }) => theme.surfaceColor};
      box-shadow: 
        inset -5px -5px 5px #0d0d0d,
        inset 10px 10px 20px ${({ theme }) => theme.surfaceColor} ;
      
      border-radius: 10px;
      &:hover {
        background-color: ${({ theme }) => theme.surfaceColor};
        box-shadow: inset -4px -4px 4px #0d0d0d;
      }
    }
  }

  html, body {
    height: 100%;
  }
  html {

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
    font-size: 16px;
    font-family: ${typography.fontFamily.regular};
  }

  img, picture, svg {
    height: 100%;
    max-width: 100%;
    display: block;
  }
  
  p { margin-bottom: 1rem; }

  h1, h2, h3, h4, h5 {
    font-weight: 400;
    line-height: 1.3;
  }

  h1 {font-size: 3.052rem;}

  h2 {font-size: 2.441rem;}

  h3 {font-size: 1.953rem;}

  h4 {font-size: 1.563rem;}

  h5 {font-size: 1.25rem;}
  
  small, caption {font-size: 0.85rem; padding-top: 0.5rem;}

  button {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  
  a {
    cursor: pointer;
    text-decoration: none;
    font-size: 0.9rem;
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
    font-size: 1rem;
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
