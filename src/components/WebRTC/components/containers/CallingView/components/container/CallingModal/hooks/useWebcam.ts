import { useCallback, useEffect, useRef, useState } from "react";

const useWebcam = (stream?: MediaStream, defaultState?: boolean) => {
  const [live, setLive] = useState<boolean>();
  const webcamTracks = useRef<MediaStreamTrack[]>();

  useEffect(() => {
    const tracks = stream?.getVideoTracks();
    if (!tracks?.isNotEmpty()) return;
    webcamTracks.current = tracks;
    tracks.forEach((track) => {
      track.enabled = !!defaultState;
    });
    setLive(!!defaultState);
  }, [stream, defaultState]);

  const handleLiveScreen = useCallback(() => {
    setLive((prev) => {
      const state = !prev;
      webcamTracks.current?.forEach((track) => {
        track.enabled = state;
      });
      return state;
    });
  }, []);

  return { live, handleLiveScreen };
};

export default useWebcam;
