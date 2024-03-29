import { ButtonTextNeumorphism } from "@components/Button";
import { useForm } from "react-hook-form";
import { FormDecorate } from "../decorates/decorates.form";
import { TextFieldNeumorphism as TextField } from "@components/TextInput";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { signIn } from "@store/repo/authenticate/authenticate";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "./Title";
import { toast } from "react-toastify";
import useAppDispatch from "@hooks/useAppDispatch";

const LoginForm = forwardRef<FormHandler>((_, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Account>({
    defaultValues: { email: "nvloc.07.97@gmail.com", password: "Tester1" },
  });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigator = useNavigate();
  const imperativeHandle = useCallback(
    () => ({
      reset: reset,
      clearError: clearErrors,
      changeValue: (name: any, value: any) => {
        setValue(name, value);
      },
    }),
    [reset, clearErrors, setValue]
  );

  useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

  const onSubmit = async (data: Account) => {
    const response = await dispatch(signIn(data)).unwrap();
    if (!response.data) return;
    const pathname = location.state?.from?.pathname;
    navigator(pathname ?? "/conversation", { replace: true });
    toast.success(`Hi! ${response.data.getFullName()}`);
  };

  return (
    <FormDecorate onSubmit={handleSubmit(onSubmit)}>
      <Title title='Login' />
      <TextField
        label='Email'
        register={register("email", {
          required: "* Please enter your email",
        })}
        errorMess={errors.email?.message}
      />
      <TextField
        label='Password'
        register={register("password", {
          required: "* Please enter your password",
        })}
        errorMess={errors.password?.message}
        security
      />
      <ButtonTextNeumorphism
        type='submit'
        width='100%'
        color='secondaryColor'
        text='Login'
      />
      <a href='/'>
        Forgot password? <strong>Click here</strong>
      </a>
    </FormDecorate>
  );
});
export default LoginForm;
