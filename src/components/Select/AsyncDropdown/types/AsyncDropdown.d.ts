interface AsyncDropdownProps<T> {
  onSelected: (items: T[]) => void;
  fetchData: (searchQuery: string) => Promise<T[]>;
  getLabel?: (data: T) => string;
}

interface Option<T> {
  value: T;
  label: string;
}
