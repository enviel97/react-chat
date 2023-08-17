import { useEffect, useState } from "react";

const SECOND = 1,
  LIMIT_SECOND = 60; // a second
const MINUTE = SECOND * 60,
  LIMIT_MINUTE = 60;
const HOUR = MINUTE * 60,
  LIMIT_HOUR = 24; // a hour

const useTimer = (start: boolean) => {
  const [tick, setTick] = useState<number>();
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hour, setHour] = useState<number>();

  useEffect(() => {
    if (!tick) return;
    setSecond(tick % LIMIT_SECOND);
    if (tick % MINUTE === 0) {
      setMinute((tick / MINUTE) % LIMIT_MINUTE);
    }
    if (tick % HOUR === 0) {
      setHour((tick / HOUR) % LIMIT_HOUR);
    }
  }, [tick]);

  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => {
      setTick((prev) => (prev ?? 0) + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [start]);

  return {
    minute,
    second,
    hour,
  };
};

export default useTimer;
