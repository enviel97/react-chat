import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { Box } from "@utils/styles";
import { ChannelMessageContainer } from "../../styles/Channel.decorate";

const MessageContainerLoading = () => (
  <SkeletonContainer>
    <ChannelMessageContainer>
      {Array.from({ length: 10 }, (_, i) => (
        <Box
          key={i}
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          gap='1em'
          flexDirection={i % 2 === 0 ? "row" : "row-reverse"}
        >
          <CircleAvatar />
          <SkeletonElement width={250} count={2} isLoading />
        </Box>
      ))}
    </ChannelMessageContainer>
  </SkeletonContainer>
);
export default MessageContainerLoading;
