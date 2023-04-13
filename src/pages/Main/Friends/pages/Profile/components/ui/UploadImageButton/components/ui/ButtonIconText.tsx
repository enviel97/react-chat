import { ButtonIcon } from "@components/Button";
import { FC, Fragment } from "react";
import { TbUpload, TbTrash } from "react-icons/tb";

interface SubProps {
  text: "upload" | "clear";
}

interface Props extends SubProps {
  onClick: () => void;
}

const IconDefault = {
  upload: {
    icon: <TbUpload />,
    color: "background",
  },
  clear: {
    icon: <TbTrash />,
    color: "notification",
  },
};

const Content: FC<SubProps> = ({ text }) => {
  return (
    <Fragment>
      {IconDefault[text].icon}
      {text}
    </Fragment>
  );
};

const ButtonIconText: FC<Props> = ({ text, onClick }) => {
  return (
    <ButtonIcon
      icon={<Content text={text} />}
      size={"2.5rem"}
      width={"10rem"}
      color={IconDefault[text].color}
      onClick={onClick}
    />
  );
};

export default ButtonIconText;
