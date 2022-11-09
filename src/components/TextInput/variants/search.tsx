import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { GoSearch } from "react-icons/go";
import { ButtonSearch, SearchNeumorphism } from "../decorate/search";
import BaseTextField from "./base";

export interface TextFieldController {
  clear: () => void;
}

interface TextFieldSearchProps extends TextFieldProps {
  onSearch: (search?: string) => void;
}

const TextFieldSearchNeumorphism = forwardRef<
  TextFieldController,
  TextFieldSearchProps
>((props, ref) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const { height = "fit-content", width = "100%", onSearch, ...prop } = props;

  useImperativeHandle(
    ref,
    () => ({
      clear: reset,
    }),
    [reset]
  );

  return (
    <SearchNeumorphism
      height={height}
      width={width}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(({ search }) => onSearch(search))}
    >
      <BaseTextField
        {...prop}
        className='textfield'
        placeholder={prop.placeholder ?? "Search"}
        register={register("search")}
      />
      <ButtonSearch type='submit'>
        <GoSearch className='search' />
      </ButtonSearch>
    </SearchNeumorphism>
  );
});
export default TextFieldSearchNeumorphism;
