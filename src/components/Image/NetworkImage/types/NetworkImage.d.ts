interface NetworkImageController {
  onLoadedError?: (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => void;
  onLoadedSuccess?: (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => void;
}

interface NetworkImageProps extends NetworkImageController {
  className?: string;
  src?: string;
  placeholder: string;
  alt?: string;
  width?: string;
  height?: string;
  refresh?: boolean;
  preventAutoRevoke?: boolean;
  viewPort?: ViewPort;
}

interface NetworkLoading {
  isLoading: boolean;
  isError?: boolean;
}
