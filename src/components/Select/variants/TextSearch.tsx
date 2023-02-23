import { colorBrightness } from "@theme/helper/tools";
import string from "@utils/string";
import { useCallback, useEffect, useRef, useState } from "react";
import { components, OptionProps } from "react-select";
import { useAsync } from "react-select/async";
import { useTheme } from "styled-components";

import { SelectSearchContainer } from "../decorates/TextSearch.decorate";

const TextSearch = <T extends TextSearchOptions>(props: TextSearchProps<T>) => {
  const {
    className,
    debounceTime = 0,
    initSearch = "Dropdown Menu",
    renderItem,
    onSelected,
    fetch,
    isMulti = true,
  } = props;
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<OptionProps[]>([]);
  const timerDebounce = useRef<string | number | NodeJS.Timeout | undefined>();
  const theme = useTheme();
  useEffect(() => {
    if (!query) return;
    // fetch(query).then((res) => {
    //   console.log(res);
    //   setData(res);
    // });
  }, [fetch, query]);

  const onChangeMemorize = useCallback(
    (searchQuery?: string) => {
      console.log("search: " + searchQuery);

      if (!!timerDebounce.current) {
        clearTimeout(timerDebounce.current);
      }
      timerDebounce.current = setTimeout(() => {
        setQuery(searchQuery);
      }, debounceTime);
    },
    [debounceTime]
  );

  return (
    <SelectSearchContainer
      cacheOptions
      loadOptions={(inputValue, callback) => {
        fetch(inputValue).then((dataList) => {
          if (!dataList) return [];
          return callback(
            dataList.map((data) => ({
              value: data.value,
              label: data.label,
            }))
          );
        });
      }}
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: theme.backgroundColor,
          height: "40px",
          color: theme.onBackgroundColor,
          border: "none",
          outline: "none",
          borderRadius: "20px",
        }),
        container: (styles, {}) => {
          return { ...styles, color: theme.onBackgroundColor };
        },
        input: (styles, {}) => {
          return {
            ...styles,
            color: theme.onBackgroundColor,
          };
        },
        multiValueRemove: (styles, { isFocused }) => {
          return {
            ...styles,
            // backgroundColor: theme.secondaryColor,
            borderRadius: "20px",
          };
        },
        multiValue: (styles, {}) => {
          return {
            ...styles,
            backgroundColor: theme.secondaryColor,
            borderRadius: "20px",
          };
        },
        multiValueLabel: (styles, {}) => {
          return {
            ...styles,
            // backgroundColor: theme.secondaryColor,
            color: theme.onBackgroundColor,
            fontWeight: "bold",
            borderRadius: "20px",
          };
        },
        option: (styles, { isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isFocused ? theme.secondaryColor : "inherit",
            color: theme.onBackgroundColor,
          };
        },
        menu: (styles) => {
          return {
            ...styles,
            backgroundColor: theme.backgroundColor,
            color: theme.onBackgroundColor,
          };
        },
      }}
      onChange={(item: any) => {
        onSelected(item);
      }}
      classNamePrefix={string.toClassName(SelectSearchContainer)}
      isMulti={isMulti}
    />
  );
};

export default TextSearch;
