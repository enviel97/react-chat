import { ButtonText } from "@components/Button";
import { FC, memo } from "react";
interface Props {
  text: string;
  loading?: boolean;
  color?: string;
  onClick: () => void;
}
const ActionButton: FC<Props> = ({ loading, onClick, text, color }) => {
  return (
    <ButtonText
      text={loading ? "Pending..." : text}
      color={color}
      height='fit-content'
      onClick={onClick}
      disabled={loading}
    />
  );
};
export default memo(ActionButton);
