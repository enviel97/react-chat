interface ModalProps extends Components {}

interface ModalOptions {
  modalId?: string;
  isDialog?: boolean;
  height?: string;
  width?: string;
  isDisableExitClose?: boolean;
  onCloseModel?: () => void;
  showCloseButton?: boolean;
  handleClose?: () => void;
}
