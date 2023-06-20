import { FC, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const Container = styled(Tooltip)``;

interface HintProps {
  relationship: Relationship;
}
const messageMapping = new Map<Relationship, string>([
  ["friend", "Your friend"],
  ["guest", "Add friend"],
  ["pending", "Move to friend request"],
  ["block", "Blocked"],
]);

const Hint: FC<HintProps> = ({ relationship }) => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setMessage(messageMapping.get(relationship));
  }, [relationship]);

  return (
    <Container anchorSelect='#FriendAction' content={message} place='right' />
  );
};

export default Hint;
