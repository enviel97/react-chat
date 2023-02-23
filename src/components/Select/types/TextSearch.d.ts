interface TextSearchOptions {
  label: string;
  value: any;
}

interface TextSearchDecorate {}

interface TextSearchAttrs<T> extends Components {
  fetch: (query: any) => Promise<T[] | undefined>;
  renderItem: (item: T) => JSX.Element;
  onSelected: (item?: T) => void;

  className?: string;
  debounceTime?: number;
  initSearch?: string;
  isMulti?: boolean;
}

type TextSearchProps<T> = TextSearchDecorate & TextSearchAttrs<T>;
