import UnknownAvatar from "@assets/unknown.png";
import DefaultBackground from "@assets/default-thumbnail.jpg";
import PlaceholderImageDark from "@assets/placeholder-image-dark.png";
import PlaceholderImageLight from "@assets/placeholder-image-dark.png";

const local = Object.freeze({
  image: {
    UnknownAvatar,
    PlaceholderImage: PlaceholderImageDark,
    EmptyImage: {
      dark: PlaceholderImageDark,
      light: PlaceholderImageLight,
    },
    backgroundDefault: DefaultBackground,
  },
});
export default local;
