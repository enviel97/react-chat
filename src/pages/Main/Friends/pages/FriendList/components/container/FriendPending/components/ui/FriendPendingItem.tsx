import { ButtonIcon } from "@components/Button";
import NetworkImage from "@components/Image/NetworkImage";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: fit-content;
  box-sizing: border-box;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

const Title = styled.div`
  height: 4rem;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 50%;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-right: 2rem;
  & span {
    &:nth-of-type(1) {
      font-size: 1rem;
      font-weight: bold;
    }
    &:nth-of-type(2) {
      font-weight: 300;
      font-size: 0.8em;
      font-style: italic;
    }
  }
`;

const Action = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const FriendPendingItem = () => {
  return (
    <Container>
      <Title>
        <NetworkImage />
      </Title>
      <Body>
        <span>Hello world</span>
        <span>pending...</span>
      </Body>
      <Action>
        <ButtonIcon
          icon={<MdCancel />}
          circle
          color='notification'
          hint='Cancel'
          hintPosition='left'
        />
      </Action>
    </Container>
  );
};

export default FriendPendingItem;
