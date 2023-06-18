import moment from "moment";
import { FC, memo } from "react";
import Styles from "../styles/AttachmentsHint.decorate";

const HintElement: FC<AttachmentInfoRowProps> = memo(({ title, content }) => {
  if (!content) return <></>;

  return (
    <Styles.Container>
      <span>{title}:</span>
      <strong>{content}</strong>
    </Styles.Container>
  );
});

const AttachmentsHints: FC<AttachmentInfoProps> = ({
  originalName,
  size,
  type,
  createdAt,
}) => {
  return (
    <Styles.Tooltip {...Styles.Animation}>
      <HintElement title='Name' content={originalName} />{" "}
      <HintElement title='Size' content={size?.toNormalSize()} />
      <HintElement title='Type' content={type} />
      <HintElement title='Send' content={moment(createdAt).fromNow()} />
    </Styles.Tooltip>
  );
};

export default memo(AttachmentsHints);
