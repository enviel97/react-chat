import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";
import { Page } from "@utils/styles";

interface AnimationProps {
  active: boolean;
}

export const AuthPage = styled(Page)<AnimationProps>`
  width: 100svw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: visible;
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
  transition: 0.5s ease-in-out;
  overflow: hidden;
  box-shadow: 0 0 5em ${({ theme }) => theme.disableColor}45;

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

  ${breakpoint.down("laptop")} {
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
  width: 60svw;
  height: 70svh;
  background-color: transparent;
  ${breakpoint.down("desktop")} {
    width: 60svw;
  }

  ${breakpoint.down("laptop")} {
    height: 80svh;
    width: min(500px + 2svw, 75svw);

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
    }
  }
  ${breakpoint.down("tablet")} {
    width: min(400px + 1svw, 85svw);
    height: 60svh;
  }
`;
