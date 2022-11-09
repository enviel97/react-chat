import { LoadingText } from "./styles";

interface LoadingTypeProps {
  text?: string;
}
const LoadingType = (props: LoadingTypeProps) => {
  const { text = "Loading." } = props;

  return (
    <LoadingText quantity={text.length + 1}>
      <h2>{`${text}.`}</h2>
    </LoadingText>
  );
};

export default LoadingType;
