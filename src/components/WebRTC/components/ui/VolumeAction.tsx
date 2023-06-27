import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

interface VolumeActionProps {}

export interface VolumeActionController {
  play: (stream: MediaStream) => void;
}

const VolumeAction = forwardRef<VolumeActionController, VolumeActionProps>(
  ({}, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
      return () => {};
    }, []);

    const play = useCallback((stream: MediaStream) => {
      if (!audioRef.current) return;
      audioRef.current.srcObject = stream;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play,
      }),
      [play]
    );

    return (
      <div>
        <audio ref={audioRef} />
      </div>
    );
  }
);

export default VolumeAction;
