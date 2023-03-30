type SEARCH = { type: "search"; payload: UserProfile[] };
type REMOVE = { type: "remove"; payload: string };
type PROCESS = {
  type: "process";
  payload: Process;
};

type Process = "idle" | "error" | "pending";

type UserProfileState = {
  data: UserProfile[] | undefined;
  process: Process;
};

type Action = SEARCH | REMOVE | PROCESS;
