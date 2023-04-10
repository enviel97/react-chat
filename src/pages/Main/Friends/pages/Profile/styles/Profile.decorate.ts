import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";
interface ProfileContainerProps {
  $backgroundUrl?: string;
}

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export const MainContainer = styled.div<ProfileContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30svh;
  padding: 2rem;
  align-items: flex-end;

  ${breakpoint.down("tablet")} {
    flex-direction: column;
  }
`;

export const EditableContainer = styled.div``;
