type AcceptType = "image" | "document" | "any";

interface AttachmentProviderProps extends Components {
  accepts?: AcceptType[];
}
