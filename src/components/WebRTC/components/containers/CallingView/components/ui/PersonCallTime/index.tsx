import { memo, useEffect, useMemo, useState } from "react";

const format = (tick: number) => (tick < 10 ? `0${tick}` : `${tick}`);

const SECOND = 1,
  LIMIT_SECOND = 60; // a second
const MINUTE = SECOND * 60,
  LIMIT_MINUTE = 60;
const HOUR = MINUTE * 60,
  LIMIT_HOUR = 24; // a hour

const PersonCallTime = () => {
  const [tick, setTick] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hour, setHour] = useState<number>();

  useEffect(() => {
    setSecond(tick % LIMIT_SECOND);
    if (tick % MINUTE === 0) {
      setMinute((tick / MINUTE) % LIMIT_MINUTE);
    }
    if (tick % HOUR === 0) {
      setHour((tick / HOUR) % LIMIT_HOUR);
    }
  }, [tick]);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const timer = useMemo(() => {
    if (!hour) return [format(minute), format(second)].join(":");
    return [format(hour), format(minute), format(second)].join(":");
  }, [minute, second, hour]);

  return <span>{timer}</span>;
};

export default memo(PersonCallTime);
