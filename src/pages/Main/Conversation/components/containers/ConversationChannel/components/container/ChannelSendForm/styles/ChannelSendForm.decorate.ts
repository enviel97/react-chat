import { TextFieldNeumorphism } from "@components/TextInput";
import styled from "styled-components";

export const ChannelFormContainer = styled.div`
  position: relative;
  height: fit-content;
  border-top: 2px solid ${({ theme }) => theme.surfaceColor};
  margin: 0 1rem;
  padding: 1em 5px;
  gap: 1px;
  box-sizing: border-box;
`;

export const ChannelForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  display: flex;
  font-weight: normal;
  gap: 1em;

  width: 100%;
  padding: 1em;
`;

export const ChannelSendingInput = styled(TextFieldNeumorphism)`
  padding-bottom: 0.5rem;
`;
