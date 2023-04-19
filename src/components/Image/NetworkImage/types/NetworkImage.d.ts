interface NetworkImageProps {
  src?: string;
  srcset?: string;
  placeholder?: string;
  alt?: string;
  wrapperClassName?: string;
  width?: string;
  height?: string;
  showLoading?: boolean;
  sizes?: string;
}

interface NetworkLoading {
  isLoading: boolean;
  isError?: boolean;
}
