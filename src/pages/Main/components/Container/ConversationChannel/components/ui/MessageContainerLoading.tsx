import SkeletonContainer, { SkeletonElement } from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { Box } from "@utils/styles";

const MessageContainerLoading = () => (
  <SkeletonContainer>
    <Box
      style={{ height: "85vh", padding: "4em 2em 1em" }}
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
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
  </SkeletonContainer>
);
export default MessageContainerLoading;
