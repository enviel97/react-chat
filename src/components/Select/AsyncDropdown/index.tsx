import useUniqueState from "@hooks/useUniqueStates";
import string from "@utils/string";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { ActionMeta, MultiValue } from "react-select";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { useTheme } from "styled-components";
import DropDownIndicator from "./components/DropDownIndicator";
import DropdownOption from "./components/DropDownOption";
import DropDownValueContainer from "./components/DropDownValueContainer";
import {
  AsyncSelect,
  AsyncDropdownDecorate,
} from "./decorate/AsyncDropdown.decorate";
import { CustomOptionProps } from "./types/AsyncDropdown.type";

type Props<T> = AsyncDropdownProps<T> & {
  customOptions?: CustomOptionProps<T>;
  initCache?: string[];
  wrapper?: boolean;
};

function AsyncDropdown<T>({
  onSelected,
  fetchData,
  getLabel,
  customOptions,
  initCache,
  wrapper = false,
}: Props<T>) {
  const theme = useTheme();
  const memorizer = useUniqueState<string>(initCache); //useMemo<Set<string>>(() => new Set(initCache), [initCache]);
  const timerId = useRef<any>(null);

  const mapping = useCallback((options: readonly Option<T>[]) => {
    return options.map(({ value }) => value);
  }, []);

  const _fetch = useCallback(
    async (inputValue: string, callBack: any) => {
      const res = await fetchData(inputValue);
      const mapping = res.map((data, index) => ({
        value: data,
        label: getLabel
          ? getLabel(data)
          : (data as any).label ?? `Label ${index}`,
      }));

      callBack(mapping);
    },
    [fetchData, getLabel, memorizer]
  );

  const _filterOptions = useCallback(
    (option: FilterOptionOption<Option<T>>) => {
      return !memorizer.has(string.getId(option.value));
    },
    [memorizer]
  );

  const _debounceFetch = useCallback(
    (inputValue: string, callBack: any) => {
      if (inputValue.length <= 3) return;
      if (!!timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        _fetch(inputValue, callBack);
      }, 500);
    },
    [_fetch]
  );

  const onChange = (
    newValue: MultiValue<Option<T>>,
    actionMeta: ActionMeta<Option<T>>
  ) => {
    const isSafeNull =
      !actionMeta.option &&
      !actionMeta.removedValue &&
      !actionMeta.removedValues;
    if (isSafeNull) return;
    if (actionMeta.removedValues) {
      actionMeta.removedValues.forEach((data) => {
        memorizer.delete(string.getId(data.value));
      });
    }
    if (actionMeta.removedValue) {
      memorizer.delete(string.getId(actionMeta.removedValue.value));
    }
    if (actionMeta.option) {
      memorizer.add(string.getId(actionMeta.option.value));
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
      filterOption={_filterOptions}
      placeholder='To'
      noOptionsMessage={() => "No Result"}
      menuShouldScrollIntoView={true}
      components={{
        Option: customOptions ?? DropdownOption<T>,
        DropdownIndicator: DropDownIndicator,
        ValueContainer: DropDownValueContainer<T>,
      }}
      styles={AsyncDropdownDecorate(theme, wrapper)}
    />
  );
}

export default memo(AsyncDropdown) as typeof AsyncDropdown;
