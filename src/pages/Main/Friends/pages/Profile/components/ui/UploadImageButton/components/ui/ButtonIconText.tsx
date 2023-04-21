import { ButtonIcon } from "@components/Button";
import { FC, Fragment } from "react";
import { TbUpload, TbTrash } from "react-icons/tb";

interface SubProps {
  text: "upload" | "clear";
}

interface Props extends SubProps {
  onClick: () => void;
  disable?: boolean;
}

const IconDefault = {
  upload: {
    icon: <TbUpload />,
    color: "secondary",
  },
  clear: {
    icon: <TbTrash />,
    color: "background",
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

const ButtonIconText: FC<Props> = ({ text, disable, onClick }) => {
  return (
    <ButtonIcon
      icon={<Content text={text} />}
      size={"2.5rem"}
      width={"10rem"}
      disabled={disable}
      color={IconDefault[text].color}
      onClick={onClick}
    />
  );
};

export default ButtonIconText;
