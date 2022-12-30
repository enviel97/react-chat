import { LocaleSpecification } from "moment";

export const shortHandleOptions: LocaleSpecification = {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dm",
    y: "a year",
    yy: "%dy",
  },
  calendar: {
    sameDay: "[Today at] hh:mm A",
    nextDay: "[Tomorrow at] hh:mm A",
    nextWeek: "dddd [at] hh:mm A",
    lastDay: "[Yesterday at] hh:mm A",
    lastWeek: "[Last] dddd [at] hh:mm A",
    sameElse: "MMM DD, YYYY [at] hh:mm A",
  },
};
