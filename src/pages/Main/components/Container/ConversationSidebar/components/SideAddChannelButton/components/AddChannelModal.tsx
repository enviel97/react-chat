import { ButtonText } from "@components/Button";
import { TextField } from "@components/TextInput";
import { FC, useEffect } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

const AddChannelModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 0.5em;
`;

const AddChannelForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  margin: 0.8rem;
  gap: 1em;
  & button {
    padding: 0.5rem 0;
  }
`;

const AddChannelHeader = styled.div`
  font-size: 1rem;
  padding: 1.2em 0;
  margin: 0 0.8em;
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.surfaceColor};
`;

interface ConversationCreate {
  message: string;
  user: string;
}

const AddChannelModal: FC<{
  onSubmitted: (data: ConversationCreate) => void;
}> = ({ onSubmitted }) => {
  const { register, handleSubmit, setFocus } = useForm<ConversationCreate>();

  useEffect(() => {
    setFocus("user");
  }, []);

  const onSubmit = (data: ConversationCreate) => {
    onSubmitted(data);
  };

  const onInvalid: SubmitErrorHandler<ConversationCreate> = (errors, event) => {
    event?.preventDefault();
    if (errors.user?.message) {
      const id = errors.user.message.toLowerCase().replaceAll(" ", "");
      if (!toast.isActive(id)) {
        toast.error(errors.user.message, {
          toastId: id,
        });
      }
    }
  };
  return (
    <AddChannelModalContainer>
      <AddChannelHeader>
        <h5>Create a New Conversation</h5>
      </AddChannelHeader>

      <AddChannelForm onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
        <TextField
          label='To'
          borderColor='transparent'
          filled='surface'
          register={register("user", {
            required: "Enter email of participant",
          })}
        />
        <TextField
          type='rich'
          label='Message (options)'
          borderColor='transparent'
          height='100%'
          id='message'
          filled='surface'
          register={register("message")}
        />
        <ButtonText type='submit' text={"Create Conversation"} />
      </AddChannelForm>
    </AddChannelModalContainer>
  );
};
export default AddChannelModal;
