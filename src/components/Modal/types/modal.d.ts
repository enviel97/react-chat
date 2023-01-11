interface ModalProps extends Components {
  handleClose?: () => void;
}

interface ModalOptions {
  modalId?: string;
  isDialog?: boolean;
  height?: string;
  width?: string;
  onCloseModel?: () => void;
  showCloseButton?: boolean;
}
