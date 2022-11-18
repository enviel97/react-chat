interface FormHandler {
  reset: () => void;
  clearError: () => void;
  changeValue: (name: string, value: string) => void;
}
