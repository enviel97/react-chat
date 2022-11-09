import { BackdropContainer } from "../styles/decorates/Backdrop.decorate";

const Backdrop = (props: BackdropProps) => {
  return (
    <BackdropContainer
      className='overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={props.onClick}
    >
      {props.children}
    </BackdropContainer>
  );
};

export default Backdrop;
