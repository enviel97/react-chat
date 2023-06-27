import { FC } from "react";
import styled from "styled-components";

interface FriendStatusStatus {
  $friendStatus: UserStatus;
  $bio?: boolean;
}
interface FriendStatusProps {
  friendStatus?: UserStatus;
  bio?: string;
}
const FriendStatusContainer = styled.span<FriendStatusStatus>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-indent: 0.5ch;
  font-size: 1rem;
  text-shadow: 0 0 0.1em currentColor;
  font-weight: normal;
  font-style: ${($bio) => (!!$bio ? "italic" : "normal ")};
  color: ${({ $friendStatus, theme }) => {
    switch ($friendStatus) {
      case "active":
        return theme.successColor;
      case "not-disturb":
        return theme.errorColor;
      case "waiting":
        return theme.warningColor;
    }
  }};

  &::before {
    content: "";
    background-color: currentColor;
    height: 0.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    box-shadow: 0 0 0.5em currentColor;
  }
`;

const FriendStatus: FC<FriendStatusProps> = ({
  friendStatus = "not-disturb",
  bio,
}) => {
  return (
    <FriendStatusContainer $friendStatus={friendStatus}>
      {bio || "Nothing to say..."}
    </FriendStatusContainer>
  );
};

export default FriendStatus;
