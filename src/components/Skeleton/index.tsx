import { pxToEm } from "@theme/helper/tools";
import string from "@utils/string";
import { FC } from "react";
import Skeleton, { SkeletonProps, SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "styled-components";

interface SkeletonContainerProps extends Components {
  height?: number | string;
}

interface SkeletonElementProps extends SkeletonProps, Components {
  isLoading?: boolean;
}

const SkeletonContainer: FC<SkeletonContainerProps> = ({
  children,
  height,
}) => {
  const theme = useTheme();
  const defaultHeight = string.typeOf(height)
    ? height
    : pxToEm(Number(height) ?? 44.4);

  return (
    <SkeletonTheme
      highlightColor={theme.backgroundColor}
      baseColor={theme.surfaceColor}
      height={defaultHeight}
    >
      {children}
    </SkeletonTheme>
  );
};

export const SkeletonElement: FC<SkeletonElementProps> = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <>
      {isLoading && <Skeleton {...props} />}
      {!isLoading && children}
    </>
  );
};

export default SkeletonContainer;
