import { ButtonText } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { useCallback, useEffect } from "react";
import { ModalConfirmContainer } from "../styles/decorates/MdalConfirm.decorate";

interface ModalConfirmProps {
  modalKey: string;
  content: any;
  onConfirm?: () => void;
  onBack?: () => void;
  justConfirm?: boolean;
}

const ModalConfirm = (props: ModalConfirmProps) => {
  const { modalKey, content, onConfirm, onBack, justConfirm = false } = props;

  const controller = useModals();

  const closeButton = () => {
    onBack && onBack();
    controller.close(modalKey);
  };

  const confirm = useCallback(() => {
    onConfirm && onConfirm();
    controller.close(modalKey);
  }, [modalKey, controller, onConfirm]);

  useEffect(() => {
    const listen = (e: KeyboardEvent) => {
      if (e.key === "Enter") confirm();
    };
    document.addEventListener("keydown", listen);
    return () => document.removeEventListener("keydown", listen);
  }, [confirm]);

  return (
    <ModalConfirmContainer>
      <p>{content}</p>
      <div className='row'>
        <div className='row'>
          <ButtonText
            type='submit'
            color='#212121'
            textColor='#cacaca'
            width='fit-content'
            text='Confirm'
            onClick={confirm}
          />
          {!justConfirm && (
            <ButtonText
              color='#aa0000'
              textColor='#cacaca'
              width='fit-content'
              text='Back'
              onClick={closeButton}
            />
          )}
        </div>
      </div>
    </ModalConfirmContainer>
  );
};

export default ModalConfirm;
