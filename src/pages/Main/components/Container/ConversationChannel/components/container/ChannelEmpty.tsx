import { ButtonText } from "@components/Button";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchAddMessages } from "@store/repo/message";
import string from "@utils/string";
import { Box } from "@utils/styles";
import { FC } from "react";
import styled from "styled-components";

const ButtonTextCustom = styled(ButtonText)`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const ChannelEmpty: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(
      fetchAddMessages({
        tempId: string.genId("Temp"),
        conversationId: id,
        message: "👋",
      })
    );
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      height='75vh'
      justifyContent='center'
      flexDirection='column'
    >
      <h5>Say hi to to begin conversation</h5>

      <ButtonTextCustom
        text='Say hi 👋'
        width='fit-content'
        height='fit-content'
        color='secondary'
        onClick={onClick}
      />
    </Box>
  );
};

export default ChannelEmpty;
