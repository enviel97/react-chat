import Faded from "@components/Animation/Faded";
import { State } from "@store/common/state";
import { isRefresh } from "@utils/validate";
import { FC, memo } from "react";
import { PongSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";

interface Props {
  status: State;
}
const CornerLoading: FC<Props> = ({ status }) => {
  const theme = useTheme();
  if (isRefresh(status))
    return (
      <Faded>
        <PongSpinner size={100} color={theme.secondaryColor} />
      </Faded>
    );
  return <></>;
};
export default memo(CornerLoading);
