interface FileInputProps {
  multiple?: boolean;
  accept?: string;
  allowSelectDuplicate?: boolean;

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
