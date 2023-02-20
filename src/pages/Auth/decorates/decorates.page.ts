import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import { typography } from "@theme/helper/typography";
import styled from "styled-components";
import { Page } from "@utils/styles";

interface AnimationProps {
  active: boolean;
}

export const AuthPage = styled(Page)<AnimationProps>`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: visible;

  &::before {
    content: "${({ active }) => (active ? "Sign Up" : "Sign In")}";
    transition: 0.5s;
    padding: 2rem;
    position: absolute;
    text-transform: uppercase;
    font-size: calc(5rem + 1vw);
    font-weight: bold;
    font-family: ${typography.fontFamily.decorate};
    color: ${({ theme }) => theme.backgroundColor};
    top: 2rem;
    text-shadow: -8px -8px 12px ${({ theme }) => colorBrightness(theme.backgroundColor, -10)}99,
      8px 8px 12px
        ${({ theme }) => colorBrightness(theme.backgroundColor, 10)}14;
    left: ${({ active }) => (!active ? "calc(100vw - 28rem)" : "0")};
    right: ${({ active }) => (!active ? "0" : "calc(100vw - 28rem)")};

    ${breakpoint.down("tablet")} {
      padding: 2rem;
      left: 0;
      height: 10rem;
      top: ${({ active }) => (!active ? "calc(100vh - 18rem)" : "0")};
    }
  }
`;

export const Box = styled.div`
  position: relative;
  display: flex;

  height: 80%;
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor}80;
  box-shadow: 0 0 5em
    ${({ theme }) => colorBrightness(theme.backgroundColor, 10)}45;
`;

export const SubBox = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.surfaceColor};
  gap: 0.5rem;
`;

export const FormContainer = styled.div<AnimationProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ active }) => (active ? "50%" : 0)};
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  width: 50%;
  box-shadow: 0 0 5em ${({ theme }) => theme.disableColor}45;
  transition: 0.5s ease-in-out;
  overflow: hidden;

  & .loginForm {
    left: ${({ active }) => (active ? "-100%" : "0")};
    visibility: ${({ active }) => (active ? "hidden" : "visible")};
    transition-delay: ${({ active }) => (active ? "0s" : "0.25s")};
  }

  & .registerForm {
    left: ${({ active }) => (active ? "0" : "100%")};
    visibility: ${({ active }) => (active ? "visible" : "hidden")};
    transition-delay: ${({ active }) => (active ? "0.25s" : "0")};
  }

  ${breakpoint.down("tablet")} {
    left: 0;
    top: ${({ active }) => (active ? "15%" : "0")};
  }
`;

export const FormBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 100%;
  transition: 0.5s;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60vw;
  height: 70vh;
  background-color: transparent;
  ${breakpoint.down("laptop")} {
    width: 80vw;
  }

  ${breakpoint.down("tablet")} {
    height: 80vh;
    width: 50vw;

    & ${Box} {
      top: 0;
      height: 100%;
    }

    & ${SubBox} {
      position: absolute;
      width: 100%;
      height: 15%;

      &.signInLink {
        top: 0;
      }

      &.signUpLink {
        bottom: 0;
      }
    }

    & ${FormContainer} {
      width: 100%;
      height: 85%;
      box-shadow: none;
    }
  }
  ${breakpoint.down("mobile")} {
    width: 90vw;
  }
`;
