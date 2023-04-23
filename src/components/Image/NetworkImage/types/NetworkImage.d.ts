interface NetworkImageProps {
  src?: string;
  srcset?: string;
  placeholder?: string;
  alt?: string;
  width?: string;
  height?: string;
  sizes?: string;
  cache?: boolean;
}

interface NetworkLoading {
  isLoading: boolean;
  isError?: boolean;
}
