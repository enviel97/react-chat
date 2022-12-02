import { ButtonIconNeumorphism } from "@components/Button";
import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import { TextFieldNeumorphism } from "@components/TextInput";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { Box } from "@utils/styles";
import { TbSend } from "react-icons/tb";
import {
  ChannelBodyContainer,
  ChannelContainer,
  ChannelFormContainer,
  ChannelHeaderContainer,
  ChannelMessageContainer,
} from "../../styles/Channel.decorate";

const ChannelLoading = () => (
  <SkeletonContainer>
    <ChannelContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={true} />
        <h4 className='channelName'>
          <SkeletonElement width={250} isLoading />
        </h4>
      </ChannelHeaderContainer>
      <ChannelBodyContainer>
        <ChannelMessageContainer>
          <Box
            style={{ height: "100%" }}
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            gap='1em'
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Box
                key={i}
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                gap='1em'
                flexDirection={i % 2 === 0 ? "row" : "row-reverse"}
              >
                <CircleAvatar isLoading={true} />
                <SkeletonElement width={250} count={2} isLoading />
              </Box>
            ))}
          </Box>
        </ChannelMessageContainer>
        <ChannelFormContainer>
          <div className='form'>
            <TextFieldNeumorphism label='Send message' />
            <ButtonIconNeumorphism
              type='submit'
              icon={<TbSend />}
              textColor='primary'
            />
          </div>
        </ChannelFormContainer>
      </ChannelBodyContainer>
    </ChannelContainer>
  </SkeletonContainer>
);
export default ChannelLoading;
