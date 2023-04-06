import { ButtonIconNeumorphism } from "@components/Button";
import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";
import useThemeMode from "@hooks/useThemeMode";
import EmojiPicker, { EmojiClickData, Props, Theme } from "emoji-picker-react";
import { FC, memo } from "react";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { PickerEmojiContainer, PickerContainer } from "./PickerEmoji.decorate";

interface PickerEmojiProps extends Props {
  onSelected?: (value: string) => void;
}

const PickerEmoji: FC<PickerEmojiProps> = ({ onSelected, ...rest }) => {
  const theme = useThemeMode();
  const { targetRef, isOpen, toggle } = useCLoseOnClickOutside(true);

  const onSelectEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    event.stopPropagation();
    const value = emoji.emoji;
    onSelected && onSelected(value);
  };

  return (
    <PickerEmojiContainer ref={targetRef}>
      <ButtonIconNeumorphism
        type='button'
        size='2.5em'
        icon={<TfiThemifyFaviconAlt />}
        onClick={toggle}
      />
      <PickerContainer $isOpen={isOpen}>
        <EmojiPicker
          {...rest}
          onEmojiClick={onSelectEmoji}
          autoFocusSearch={true}
          theme={Theme[theme.isDark ? "DARK" : "LIGHT"]}
          previewConfig={{ showPreview: false }}
          searchPlaceHolder="Your's feel ?"
          skinTonesDisabled={true}
          lazyLoadEmojis={false}
        />
      </PickerContainer>
    </PickerEmojiContainer>
  );
};

export default memo(PickerEmoji);
