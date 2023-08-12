import { useCallback, useEffect, useRef, useState } from "react";

const useAudio = (stream?: MediaStream, defaultState?: boolean) => {
  const audioTracks = useRef<MediaStreamTrack[]>();
  const [audio, setAudio] = useState<boolean>(!!defaultState);

  // update state with props
  useEffect(() => {
    setAudio(!!defaultState);
  }, [defaultState]);

  useEffect(() => {
    const tracks = stream?.getAudioTracks();
    if (!tracks?.isNotEmpty()) return;
    audioTracks.current = tracks;
    tracks.forEach((track) => {
      track.enabled = !!defaultState;
    });
  }, [stream, defaultState]);

  useEffect(() => {
    const tracks = stream?.getAudioTracks();
    if (!tracks?.isNotEmpty()) return;
  });

  const handleLiveAudio = useCallback(() => {
    setAudio((prev) => {
      const state = !prev;
      audioTracks.current?.forEach((track) => {
        track.enabled = state;
      });
      return state;
    });
  }, []);

  return { audio, handleLiveAudio };
};

export default useAudio;
