import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import {
  UploadImageProfile,
  UploadImageProfileMotions,
} from "./styles/UploadInfo.decorate";
import convert from "./utils/converts";

interface Props {
  file?: File;
}

const UploadInfo: FC<Props> = ({ file }) => {
  return (
    <AnimatePresence mode='wait'>
      {!file ? (
        <></>
      ) : (
        <UploadImageProfile key='expandedInfo' {...UploadImageProfileMotions}>
          <span>
            <strong>Type</strong>
            {file.type}
          </span>
          <span>
            <strong>Size </strong>
            {convert(file.size).toFlexible()}
          </span>
        </UploadImageProfile>
      )}
    </AnimatePresence>
  );
};

export default memo(UploadInfo);
