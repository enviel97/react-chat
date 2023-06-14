interface CacheImageController {
  onLoadedError?: (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => void;
  onLoadedSuccess?: (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => void;
}

interface CacheImageProps extends CacheImageController {
  className?: string;
  src?: string;
  placeholder: string;
  alt?: string;
  width?: string;
  height?: string;
  refresh?: boolean;
  preventAutoRevoke?: boolean;
  viewPort?: ViewPort;
  type?: ImageType;
}

interface NetworkLoading {
  isLoading: boolean;
  isError?: boolean;
}
