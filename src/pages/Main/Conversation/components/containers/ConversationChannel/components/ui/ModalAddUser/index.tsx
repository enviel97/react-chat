import { ButtonText } from "@components/Button";
import { AsyncDropdown } from "@components/Select";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchSearchUser } from "@store/repo/user";
import string from "@utils/string";
import { FC, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { TiUserAdd } from "react-icons/ti";
import {
  ModalBodyContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "./ModalAddUser.decorate";

interface ModalAddUserProps {
  participantIds: string[];
  onSelectedUsers(ids: string[]): void;
}
interface FoundUserValues {
  ids: string[];
}

const ModalAddUser: FC<ModalAddUserProps> = ({
  onSelectedUsers,
  participantIds,
}) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, watch, setValue } = useForm<FoundUserValues>();

  const fetchUsers = useCallback(
    async (searchQuery: string) => {
      const users = await dispatch(fetchSearchUser(searchQuery)).unwrap();
      return users ?? [];
    },
    [dispatch]
  );

  const onSubmit = (data: FoundUserValues) => {
    onSelectedUsers(data.ids);
  };

  const onSelected = (items: User[]) => {
    setValue(
      "ids",
      items.map((item) => string.getId(item))
    );
  };

  return (
    <ModalContainer>
      <ModalHeaderContainer>
        <TiUserAdd size={"2em"} />
        <span>Add new member</span>
      </ModalHeaderContainer>

      <ModalBodyContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AsyncDropdown<User>
            getLabel={(user) => string.getFullName(user)}
            onSelected={onSelected}
            fetchData={fetchUsers}
            initCache={participantIds}
            wrapper
          />

          <ButtonText
            type='submit'
            height='2.5rem'
            width='fit-content'
            text='Add + '
            color='secondary'
            disabled={!watch().ids}
          />
        </form>
      </ModalBodyContainer>
    </ModalContainer>
  );
};

export default memo(ModalAddUser);
