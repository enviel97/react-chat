import string from "@utils/string";
import { memo, useCallback, useMemo, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { ActionMeta, components, MultiValue } from "react-select";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { useTheme } from "styled-components";
import {
  AsyncSelect,
  AsyncDropdownDecorate,
} from "./decorate/AsyncDropdown.decorate";
import {
  AsyncDropdownOption,
  AsyncDropdownIcon,
} from "./types/AsyncDropdown.type";

function DropDownIndicator(props: AsyncDropdownIcon<any>) {
  return (
    <components.DropdownIndicator {...props}>
      <BiSearch />
    </components.DropdownIndicator>
  );
}

function DropdownOption<T>({ children, ...props }: AsyncDropdownOption<T>) {
  console.log(props);
  return <components.Option {...props}>{props.label}</components.Option>;
}

function AsyncDropdown<T>({
  onSelected,
  fetchData,
  getLabel,
}: AsyncDropdownProps<T>) {
  const theme = useTheme();
  const memorizer = useMemo<Set<string>>(() => new Set(), []);
  const timerId = useRef<any>(null);

  const mapping = (options: readonly Option<T>[]) => {
    return options.map(({ value }) => value);
  };

  const _fetch = useCallback(
    async (inputValue: string, callBack: AsyncOptionCallBack<T>) => {
      const res = await fetchData(inputValue);
      const mapping = res.map((data, index) => ({
        value: data,
        label: getLabel
          ? getLabel(data)
          : (data as any).label ?? `Label ${index}`,
      }));

      callBack(mapping);
    },
    [fetchData, getLabel]
  );

  const _debounceFetch = useCallback(
    (inputValue: string, callBack: AsyncOptionCallBack<T>) => {
      if (inputValue.length <= 3) return;
      if (!!timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        _fetch(inputValue, callBack);
      }, 500);
    },
    [_fetch]
  );

  const _filterOptions = useCallback(
    (option: FilterOptionOption<Option<T>>) => {
      return !memorizer.has(string.getId(option.value));
    },
    [memorizer]
  );

  const onChange = (
    newValue: MultiValue<Option<T>>,
    actionMeta: ActionMeta<Option<T>>
  ) => {
    const option = actionMeta.option ?? actionMeta.removedValue;
    if (!option) return;
    if (actionMeta.removedValue) {
      memorizer.delete(string.getId(option.value));
    }
    if (actionMeta.option) {
      memorizer.add(string.getId(option.value));
    }
    onSelected(mapping(newValue));
  };

  return (
    <AsyncSelect
      autoFocus
      isMulti
      cacheOptions
      loadOptions={_debounceFetch}
      onChange={onChange}
      placeholder='To'
      filterOption={_filterOptions}
      noOptionsMessage={() => "No Result"}
      components={{
        Option: DropdownOption<T>,
        DropdownIndicator: DropDownIndicator,
      }}
      styles={AsyncDropdownDecorate(theme)}
    />
  );
}

export default memo(AsyncDropdown) as typeof AsyncDropdown;
