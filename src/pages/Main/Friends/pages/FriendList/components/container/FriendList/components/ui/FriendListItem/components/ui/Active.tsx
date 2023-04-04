import { FC } from "react";
import styled from "styled-components";

interface UserActiveProps {
  friendUserActive: UserStatus;
}
const UserActiveContainer = styled.span<{ $friendUserActive: UserStatus }>`
  position: relative;
  font-weight: bold;
  text-indent: 1.5rem;
  text-transform: capitalize;
  color: ${({ $friendUserActive, theme }) => {
    switch ($friendUserActive) {
      case "active":
        return theme.successColor;
      case "not-disturb":
        return theme.errorColor;
      case "waiting":
        return theme.warningColor;
    }
  }};

  &:after {
    content: "";
    position: absolute;
    background-color: currentColor;
    height: 1rem;
    aspect-ratio: 1/1;
    left: 0;
    top: 50%;
    bottom: 50%;
    border-radius: 50%;
    transform: translate(0, -50%);
  }
`;

const UserActive: FC<UserActiveProps> = ({ friendUserActive }) => {
  return (
    <UserActiveContainer $friendUserActive={friendUserActive}>
      {friendUserActive}
    </UserActiveContainer>
  );
};

export default UserActive;
