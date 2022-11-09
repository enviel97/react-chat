interface ModalProps extends Components {
  handleClose?: () => void;
}

interface ModalOptions {
  key?: string;
  isDialog?: boolean;
  height?: string;
  width?: string;
  onCloseModel?: () => void;
  showCloseButton?: boolean;
}
