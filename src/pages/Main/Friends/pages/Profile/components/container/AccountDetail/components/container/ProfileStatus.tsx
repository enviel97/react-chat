import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { changeStatus } from "@store/repo/user";
import { selectProfile } from "@store/slices/profiles";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useMemo, useState } from "react";
import { RingSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";
import {
  ProfileStatusContainer,
  ProfileStatusLoadingContainer,
} from "../../styles/ProfileStatus.decorate";
import DropdownAction from "../ui/DropdownAction";

const ProfileStatus: FC = () => {
  const profile = useAppSelector(selectProfile);
  const theme = useTheme();

  const color = useMemo(() => {
    return new Map<UserStatus, string>([
      ["active", theme.successColor],
      ["not-disturb", theme.errorColor],
      ["waiting", theme.warningColor],
    ]);
  }, [theme.successColor, theme.errorColor, theme.warningColor]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    color.get(profile.status ?? "active")
  );

  const dispatch = useAppDispatch();
  const _handleOnSelected = function (selected: UserStatus): void {
    setLoading(true);
    setSelectedColor(color.get(selected));
    dispatch(changeStatus(selected))
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <ProfileStatusContainer>
      <DropdownAction
        defaultValue={profile.status ?? "active"}
        onSelectedOption={_handleOnSelected}
      />
      <ProfileStatusLoadingContainer>
        <AnimatePresence mode='wait'>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.25 }}
            >
              <RingSpinner color={selectedColor} size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </ProfileStatusLoadingContainer>
    </ProfileStatusContainer>
  );
};
export default memo(ProfileStatus);
