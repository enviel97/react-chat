import { neumorphismBoxShadow } from "@common/helper/tools";
import { zIndex } from "@core/common/zIndex.define";
import { ToastContainer, Bounce } from "react-toastify";
import styled from "styled-components";

// Document:  https://fkhadra.github.io/react-toastify/multi-containers

export const toastDefaultOption = {
  autoClose: 3000,
  hideProgressBar: false,
  transition: Bounce,
  closeOnClick: true,
  newestOnTop: true,
  draggablePercent: 40,
  draggable: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
};

const StyledToastContainer = styled(ToastContainer)`
  color: white;
  font-size: 1rem;
  z-index: ${zIndex.ToastContainer};
  .toast {
    color: inherit;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: ${neumorphismBoxShadow(false, {
      background: "#000000",
    })};
    transition: 0.5s;
  }
  & button[type="button"] {
    color: inherit;
    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }
`;

const ToastProvider = () => {
  return (
    <StyledToastContainer
      {...toastDefaultOption}
      toastClassName={"toast"}
      draggableDirection={"x"}
      position='top-right'
      limit={5}
    />
  );
};

export default ToastProvider;
