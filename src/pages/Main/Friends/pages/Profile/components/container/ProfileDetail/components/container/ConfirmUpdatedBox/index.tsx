import { FC, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ConfirmUpdateBoxAction,
  ConfirmUpdateBoxButton,
  ConfirmUpdateBoxContainer,
  ConfirmUpdateBoxContent,
  ConfirmUpdateBoxHeader,
  ConfirmUpdateBoxBackdrop,
} from "./styles/ConfirmUpdateBox.decorate";
import { CiWarning } from "react-icons/ci";
import { AnimatePresence } from "framer-motion";
import { ConfirmUpdateBoxAnimate } from "./styles/ConfirmUpdateBox.animation";
import { useTheme } from "styled-components";
import useBlocker from "@context/hooks/useBlocker";
import { useNavigate } from "react-router-dom";

interface ConfirmUpdateBoxProps {}

const ConfirmUpdateBox: FC<ConfirmUpdateBoxProps> = () => {
  const {
    reset,
    clearErrors,
    formState: { isDirty, isSubmitted },
  } = useFormContext<ProfileEditable>();
  const [isForceBlock, setForceBlock] = useState<boolean>();
  const [isFocus, setIsFocus] = useState<boolean>();
  const navigator = useNavigate();
  const theme = useTheme();
  const animation = ConfirmUpdateBoxAnimate(theme);

  const blocker = useBlocker(
    useCallback(() => {
      setIsFocus(true);
      return isDirty && !isSubmitted;
    }, [isDirty, isSubmitted])
  );

  useEffect(() => {
    if (blocker.state === "blocked" && !!isForceBlock) {
      blocker.reset();
      navigator(blocker.location.pathname);
    }
  }, [blocker, isForceBlock, navigator]);

  const _handleCancelClick = () => {
    clearErrors();
    reset();
    if (isFocus) {
      setForceBlock(true);
    }
  };
  const _handleClickSubmit = () => {};

  const _handleUnFocus = () => {
    if (isFocus) {
      setIsFocus(false);
    }
  };

  return (
    <AnimatePresence>
      {isDirty && (
        <ConfirmUpdateBoxBackdrop
          {...animation.backdrop}
          style={{ backdropFilter: `blur(${isFocus ? 10 : 0}px)` }}
          animate={isFocus ? "focus" : "normal"}
        >
          <ConfirmUpdateBoxContainer {...animation.container}>
            <ConfirmUpdateBoxHeader>
              <CiWarning strokeWidth={1} /> <span>Notification</span>
            </ConfirmUpdateBoxHeader>
            <ConfirmUpdateBoxContent>
              {isFocus ? (
                <>
                  You changed something in your profile, are you sure to{" "}
                  <strong>continue </strong> move out
                  <strong>this page</strong>
                  !!!
                </>
              ) : (
                <>
                  You changed something in your profile, click{" "}
                  <strong>save</strong> to make it
                  <strong>public</strong>
                  !!!
                </>
              )}
            </ConfirmUpdateBoxContent>
            <ConfirmUpdateBoxAction>
              <ConfirmUpdateBoxButton
                size='16rem'
                type='submit'
                text='Save'
                color='secondary'
                onClick={_handleClickSubmit}
              />
              <ConfirmUpdateBoxButton
                size='16rem'
                text={isFocus ? "Continue" : "Clear"}
                onClick={_handleCancelClick}
              />
              {isFocus && (
                <ConfirmUpdateBoxButton
                  size='16rem'
                  text='Back'
                  onClick={_handleUnFocus}
                />
              )}
            </ConfirmUpdateBoxAction>
          </ConfirmUpdateBoxContainer>
        </ConfirmUpdateBoxBackdrop>
      )}
    </AnimatePresence>
  );
};

export default ConfirmUpdateBox;
