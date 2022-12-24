import { ButtonIconNeumorphism } from "@components/Button";
import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
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
  const tabRef = useRef(0);
  const focusableModalElements = useRef<any[]>([]);

  const modalRef = createRef<any>();
  useLayoutEffect(() => {
    focusableModalElements.current = modalRef?.current.querySelectorAll(
      'a[href], button:not([itemtype="close"]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
  }, [modalRef]);

  const handleTabKey = useCallback(
    (e: any) => {
      if (!modalRef.current || focusableModalElements.current.length <= 0) {
        return;
      }

      const focusElements = focusableModalElements.current;

      if (tabRef.current === 2) {
        focusElements[0].focus();
        tabRef.current = 0;
        return e.preventDefault();
      } else {
        focusElements[tabRef.current + 1].focus();
        tabRef.current = tabRef.current + 1;
        return e.preventDefault();
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
        {props.children}
        {showCloseButton && (
          <CloseButtonContainer tabIndex={-1}>
            <ButtonIconNeumorphism
              itemType='close'
              icon={<RiCloseLine />}
              onClick={props.handleClose}
            />
          </CloseButtonContainer>
        )}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
