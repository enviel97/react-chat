import { ButtonIconNeumorphism } from "@components/Button";
import { createRef, useCallback, useEffect, useMemo } from "react";
import { RiCloseLine } from "react-icons/ri";
import {
  CloseButtonContainer,
  ModalContainer,
} from "../styles/decorates/Modal.decorate";
import { dropIn } from "../styles/variants/modal.variants";
import Backdrop from "./Backdrop";

type Props = ModalProps & ModalOptions;

const Modal = (props: Props) => {
  const {
    isDialog = true,
    showCloseButton = true,
    width = "700px",
    height = "400px",
  } = props;

  const modalRef = createRef<any>();

  const handleTabKey = useCallback(
    (e: any) => {
      if (!modalRef.current) {
        return;
      }
      const focusableModalElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];

      if (!e.shiftKey && document.activeElement !== firstElement) {
        firstElement.focus();
        return e.preventDefault();
      }

      if (e.shiftKey && document.activeElement !== lastElement) {
        lastElement.focus();
        e.preventDefault();
      }
    },
    [modalRef]
  );

  const keyListenersMap = useMemo(
    () =>
      new Map([
        [27, props.handleClose],
        [9, handleTabKey],
      ]),
    [props.handleClose, handleTabKey]
  );

  useEffect(() => {
    const keyListener = (e: any) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    };
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  }, [keyListenersMap]);

  return (
    <Backdrop onClick={!isDialog ? props.handleClose : undefined}>
      <ModalContainer
        ref={modalRef}
        height={height}
        width={width}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        onClick={(e: any) => e.stopPropagation()}
        aria-modal='true'
        role={"dialog"}
      >
        {showCloseButton && (
          <CloseButtonContainer>
            <ButtonIconNeumorphism
              icon={<RiCloseLine />}
              onClick={props.handleClose}
            />
          </CloseButtonContainer>
        )}
        {props.children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
