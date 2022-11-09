import { LoaderContainer, OutlineCircle } from "./styles";
interface NormalLoadingProps {
  size?: string;
}
const NormalLoading = (props: NormalLoadingProps) => {
  const { size = "28px" } = props;
  return (
    <LoaderContainer size={size}>
      <OutlineCircle version='1.1' viewBox='0 0 180 180'>
        <circle cx={70} cy={70} r={70} />
      </OutlineCircle>
    </LoaderContainer>
  );
};

export default NormalLoading;
