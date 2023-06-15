import { TextFieldNeumorphism } from "@components/TextInput";
import styled from "styled-components";

export const ChannelFormContainer = styled.div`
  position: relative;
  display: block;
  border-top: 2px solid ${({ theme }) => theme.surfaceColor};
  padding: 0 15px;
  box-sizing: border-box;
  width: 100%;
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
