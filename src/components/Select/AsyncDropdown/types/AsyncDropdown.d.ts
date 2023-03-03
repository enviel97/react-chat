interface AsyncDropdownProps<T> {
  onSelected: (items: T[]) => void;
  fetchData: (searchQuery: string) => Promise<T[]>;
  getLabel?: (data: T) => string;
}

type AsyncOptionCallBack<T> = (
  options: OptionsOrGroups<T, GroupBase<T>>
) => void;

interface Option<T> {
  value: T;
  label: string;
}
