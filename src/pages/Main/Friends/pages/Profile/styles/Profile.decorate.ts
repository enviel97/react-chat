import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";
interface ProfileContainerProps {
  $backgroundUrl?: string;
}

export const ProfileContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
`;

export const MainContainer = styled.div<ProfileContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 350px;
  padding: 2rem;
  align-items: flex-end;
  gap: 1rem;

  ${breakpoint.down("tablet")} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const EditableContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: fit-content;
`;
