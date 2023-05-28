interface FileInputProps {
  multiple?: boolean;
  accept?: string;
  allowSelectDuplicate?: boolean;
  className?: string;

  /**
   * size: calc by bytes
   */
  maxSize?: number;
  maxQuantity?: number;
  selectedFile?: (files: File[]) => void;
}

interface FileInputRef {
  onOpenBrowser: () => void;
}
