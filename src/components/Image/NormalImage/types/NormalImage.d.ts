interface NormalImageProps {
  className?: string;
  src?: string;
  width?: string;
  height?: string;
  draggable?: "false" | "true";
  threshold?: number;
  wrapperInjection?: string;
  placeholderSrc?: string;
}

type LoadState = "idle" | "loading" | "success" | "error";
