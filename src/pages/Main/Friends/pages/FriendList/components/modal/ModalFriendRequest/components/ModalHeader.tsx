import { TextFieldSearchNeumorphism } from "@components/TextInput";
import { memo, useEffect, useRef, useState } from "react";
import useSearch from "../hooks/useSearch";
import { ModalFriendRequestHeader } from "../styles/ModalFriendRequest.decorate";

const ModalHeader = () => {
  const {
    state: { data, process },
    search,
  } = useSearch();
  const [notification, setNotification] = useState<string>();
  const timeDebounce = useRef<any>(null);

  const _onSearch = function (query?: string | undefined): void {
    if (!query || query.length < 3) {
      setNotification("You should enter more than 3 letter");
      return;
    }
    search(query);
  };

  const _onChanged = function (value: string): void {
    if (notification) setNotification(undefined);
    setNotification("Loading...");
    if (!!timeDebounce.current) {
      clearTimeout(timeDebounce.current);
    }
    timeDebounce.current = setTimeout(() => {
      setNotification("");
      _onSearch(value);
    }, 500);
  };

  useEffect(() => {
    if (process === "idle") setNotification("Enter name, email,...");
    else if (process === "pending") setNotification("Loading...");
    else if (process === "error") setNotification("Have something wrong");
    else setNotification("");
  }, [process]);

  useEffect(() => {
    if (data === undefined || data.length !== 0) {
      setNotification(undefined);
      return;
    }
    setNotification("Not found any user");
  }, [data]);

  return (
    <ModalFriendRequestHeader>
      <h4>Add friend modal</h4>
      <TextFieldSearchNeumorphism
        onChanged={_onChanged}
        onSearch={_onSearch}
        placeholder={"Search by name, email,..."}
      />
      {notification && <span>{notification}</span>}
    </ModalFriendRequestHeader>
  );
};

export default memo(ModalHeader);
