import useAppDispatch from "@hooks/useAppDispatch";
import { fetchSearchFriend } from "@store/repo/user";
import string from "@utils/string";
import { createContext, FC, useCallback, useReducer, useRef } from "react";

const userProfileReducer = (state: UserProfileState, action: Action) => {
  switch (action.type) {
    case "search": {
      return {
        ...state,
        data: [...action.payload],
      };
    }

    case "remove": {
      const idRemove = string.getId(action.payload);
      return {
        ...state,
        data: state.data?.filter((profile) => profile.getId() !== idRemove),
      };
    }

    case "process": {
      return {
        ...state,
        process: action.payload,
      };
    }
  }
};

const initState: UserProfileState = {
  data: undefined,
  process: "idle",
};

type Context = {
  state: UserProfileState;
  search: (query: string) => void;
  remove: (id: string) => void;
};

export const SearchContext = createContext<Context>({
  state: initState,
  search: (query: string) => {
    throw new Error("Function un implement");
  },
  remove: (id: string) => {
    throw new Error("Function un implement");
  },
});

const SearchProvider: FC<Components> = ({ children }) => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(userProfileReducer, initState);

  const searchPromise = useRef<any>(null);

  const search = useCallback(
    (query: string) => {
      if (searchPromise.current) {
        searchPromise.current.abort();
      }
      searchPromise.current = appDispatch(fetchSearchFriend(query));
      searchPromise.current
        .unwrap()
        .then((res: UserProfile[]) => {
          dispatch({ type: "search", payload: res });
          dispatch({ type: "process", payload: "pending" });
        })
        .catch(() => {
          dispatch({ type: "search", payload: [] });
          dispatch({ type: "process", payload: "error" });
        });
    },
    [dispatch, searchPromise, appDispatch]
  );

  const remove = useCallback(
    (id: string) => dispatch({ type: "remove", payload: id }),
    [dispatch]
  );

  return (
    <SearchContext.Provider
      value={{
        state: state,
        search,
        remove,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
