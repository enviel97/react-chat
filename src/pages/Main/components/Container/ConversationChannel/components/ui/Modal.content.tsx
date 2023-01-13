import { FC } from "react";

export const DeleteContent = () => {
  return (
    <>
      This message will be deleted from the chat
      <b style={{ color: "red" }}>Are you sure about this</b>
      <small style={{ fontStyle: "italic" }}>
        * you can't return it will accept action
      </small>
    </>
  );
};

export const EditContent: FC<{ messageDirty: string }> = ({ messageDirty }) => {
  return (
    <>
      <span>
        This message will be edited to
        <b style={{ color: "#f20000" }}>{messageDirty}</b>
      </span>

      <b style={{ color: "red" }}>Are you sure about this</b>
      <small style={{ fontStyle: "italic" }}>
        * you can't return it will accept action
      </small>
    </>
  );
};
