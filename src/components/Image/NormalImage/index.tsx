import local from "@common/local.define";
import { safeLog } from "@core/api/utils/logger";
import useThemeMode from "@hooks/useThemeMode";
import string from "@utils/string";
import { FC, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ClassicSpinner } from "react-spinners-kit";
import { toast } from "react-toastify";
import { useTheme } from "styled-components";
import {
  Placeholder,
  NormalImageContainer,
  NormalImageWrapper,
} from "./styles/NormalImage.decorate";

const NormalImage: FC<NormalImageProps> = ({
  width,
  height,
  draggable,
  className,
  src = "",
  wrapperInjection,
  threshold = 100,
  placeholderSrc,
}) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const placeHolder = useMemo(() => {
    return src || local.image.EmptyImage[isDark ? "dark" : "light"];
  }, [isDark, src]);

  useEffect(() => {
    const toastKey = src ?? "imageNotification";
    if (loadState === "error" && !toast.isActive(toastKey)) {
      toast.error("Load image error", { toastId: toastKey });
    }
  }, [loadState, src]);

  return (
    <NormalImageContainer className={className} $state={loadState}>
      {loadState === "loading" && (
        <Placeholder>
          <ClassicSpinner color={theme.onPrimaryColor} />
        </Placeholder>
      )}
      <LazyLoadImage
        src={src}
        effect='blur'
        width={width}
        height={height}
        draggable={draggable}
        wrapperClassName={string.classList(
          `${NormalImageWrapper}`.toClassName(),
          wrapperInjection
        )}
        threshold={threshold}
        beforeLoad={() => setLoadState("loading")}
        afterLoad={() => setLoadState("success")}
        onError={() => {
          safeLog(`Logger: image load error (src: ${src})`);
          setLoadState("error");
        }}
        visibleByDefault={placeHolder === src}
        placeholderSrc={placeholderSrc || placeHolder}
      />
    </NormalImageContainer>
  );
};

export default NormalImage;
