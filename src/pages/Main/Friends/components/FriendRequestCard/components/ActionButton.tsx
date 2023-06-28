import { ButtonIconCircle } from "@components/Button";
import { FC, memo } from "react";

type Text = "Allow" | "Reject";
interface Props {
  text: Text;
  loading?: boolean;
  onClick: () => void;
}

const ActionButton: FC<Props> = ({ loading, onClick, text }) => {
  const color = text === "Allow" ? "#00f400" : "#f40000";

  return (
    <ButtonIconCircle
      icon={text}
      color={{ hex: color }}
      size='2.75rem'
      // onClick={onClick}
      disabled={loading}
    />
  );
};
export default memo(ActionButton);
