import { useContext } from "react";
import { ModalContext } from "..";

export const useModals = () => {
  const action = useContext(ModalContext);
  return action;
};
