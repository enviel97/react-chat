import { ButtonIconNeumorphism } from "@components/Button";
import SkeletonContainer from "@components/Skeleton";
import { TextFieldNeumorphism } from "@components/TextInput";
import { TbSend } from "react-icons/tb";
import { ChannelFormContainer } from "../../styles/Channel.decorate";

const ChannelBodyLoading = () => {
  return (
    <SkeletonContainer>
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
    </SkeletonContainer>
  );
};
export default ChannelBodyLoading;
