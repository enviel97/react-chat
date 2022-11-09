import { ButtonText } from "@components/Button";
import { SubBox } from "../decorates/decorates.page";

interface ActionProps {
  action: () => void;
  className: string;
  type: "Sign In" | "Sign Up";
}

const Action = (props: ActionProps) => {
  const { type, action } = props;

  return (
    <SubBox className={props.className}>
      <h5 className='decorate'>
        {type === "Sign In"
          ? "Already have an Account ?"
          : "Don't have Account ?"}
      </h5>
      <ButtonText
        height='max-content'
        width='max-content'
        onClick={action}
        text={type}
      />
    </SubBox>
  );
};

export default Action;
