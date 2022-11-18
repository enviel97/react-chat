import { ButtonTextNeumorphism } from "@components/Button";
import { useForm } from "react-hook-form";
import { FormDecorate } from "../decorates/decorates.form";
import { TextFieldNeumorphism as TextField } from "@components/TextInput";
import { forwardRef, useImperativeHandle } from "react";
import { signIn } from "../repo/authenticate/authenticate";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "@hooks/useAuthenticate";

const LoginForm = forwardRef<FormHandler>((_, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Account>({
    defaultValues: { email: "nvloc.07.97@gmail.com", password: "123Admin1" },
  });
  const navigator = useNavigate();
  const { updateAuthUser } = useAuthenticate();

  useImperativeHandle(
    ref,
    () => ({
      reset: reset,
      clearError: clearErrors,
      changeValue: (name: any, value) => {
        setValue(name, value);
      },
    }),
    [reset, clearErrors]
  );

  const onSubmit = async (data: Account) => {
    const response = await signIn(data);
    if (response.data) {
      updateAuthUser(response.data);
      navigator("/", { replace: true });
    }
  };

  return (
    <FormDecorate onSubmit={handleSubmit(onSubmit)}>
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
        width='100%'
        color='secondaryColor'
        type='submit'
        text='Login'
      />
      <a href='/'>
        Forgot password? <strong>Click here</strong>
      </a>
    </FormDecorate>
  );
});
export default LoginForm;
