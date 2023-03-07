import { ButtonText } from "@components/Button";
import { AsyncDropdown } from "@components/Select";
import { CustomOptionProps } from "@components/Select/AsyncDropdown/types/AsyncDropdown.type";
import { TextField } from "@components/TextInput";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchSearchUser } from "@store/repo/user";
import string from "@utils/string";
import { FC, useCallback } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { components } from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AsyncOptionContainer } from "../../styles/AsyncOption.decorate";
import { mappingUsers } from "../../utils/mapping";

const AddChannelModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 0.5em;
`;

const AddChannelForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  padding: 0.8rem;
  gap: 1em;
  & button {
    padding: 0.8rem 0;
  }
`;

const AddChannelHeader = styled.h5`
  font-size: 1em;
  padding: 1em 0;
  font-weight: bold;
  margin: 0 0.8em;
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.surfaceColor};
`;

interface ConversationCreate {
  message: string;
  user: string;
}

const AsyncUserOption: CustomOptionProps<User> = (props) => {
  return (
    <components.Option {...props}>
      <AsyncOptionContainer>
        {props.data.value.email}
        <span className='sub'>({string.getFullName(props.data.value)})</span>
      </AsyncOptionContainer>
    </components.Option>
  );
};

const AddChannelModal: FC<{
  onSubmitted: (data: ConversationCreate) => void;
}> = ({ onSubmitted }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, watch } =
    useForm<ConversationCreate>();

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

  const onSelectUser = useCallback((items: User[]) => {
    setValue("user", mappingUsers(items));
  }, []);

  const fetchUsers = useCallback(async (searchQuery: string) => {
    const users = await dispatch(fetchSearchUser(searchQuery)).unwrap();
    return users.data ?? [];
  }, []);

  return (
    <AddChannelModalContainer>
      <AddChannelHeader>Create a New Conversation</AddChannelHeader>

      <AddChannelForm onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
        <AsyncDropdown<User>
          getLabel={(user) => string.getFullName(user)}
          customOptions={AsyncUserOption}
          onSelected={onSelectUser}
          fetchData={fetchUsers}
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
        <ButtonText
          type='submit'
          height='2.5rem'
          text={"Create Conversation"}
          color='secondary'
          disabled={!watch().user}
        />
      </AddChannelForm>
    </AddChannelModalContainer>
  );
};
export default AddChannelModal;
