interface ModalProps extends Components {}

interface ModalOptions {
  modalId?: string;
  isDialog?: boolean;
  height?: string;
  width?: string;
  onCloseModel?: () => void;
  showCloseButton?: boolean;
  handleClose?: () => void;
}
