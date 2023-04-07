import { ButtonTextNeumorphism } from "@components/Button";
import { FormDecorate } from "../decorates/decorates.form";
import { TextFieldNeumorphism as TextField } from "@components/TextInput";
import { useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";
import { signUp } from "@store/repo/authenticate/authenticate";
import Title from "./Title";

interface RegisterValue extends User {
  confirmPassword: string;
}

interface RegisterFormProps {
  changeLoginValue?: (name: string, value: string) => void;
}

const RegisterForm = forwardRef<FormHandler, RegisterFormProps>(
  (props, ref) => {
    const {
      handleSubmit,
      reset,
      register,
      clearErrors,
      setValue,
      formState: { errors },
    } = useForm<RegisterValue>({});

    useImperativeHandle(
      ref,
      () => ({
        reset: reset,
        clearError: clearErrors,
        changeValue: (name: any, value) => {
          setValue(name, value);
        },
      }),
      [reset, clearErrors, setValue]
    );

    const onSubmit = async (data: User) => {
      const response = await signUp(data);
      if (response?.data) {
        const buttonAction = document.querySelector(
          ".signInLink button"
        ) as HTMLButtonElement;
        if (!buttonAction) return;
        buttonAction.click();
        if (!props.changeLoginValue) return;
        props.changeLoginValue("email", data.email);
        props.changeLoginValue("password", "");
      }
    };

    return (
      <FormDecorate>
        <Title title='Register' />
        <TextField
          id='email'
          label='Email'
          register={register("email", {
            required: "* Field is required",
          })}
          errorMess={errors.email?.message}
        />
        <div className='group'>
          <TextField
            id='first_name'
            label='First Name'
            register={register("firstName", {
              required: "* Field is required",
            })}
            errorMess={errors.firstName?.message}
          />
          <TextField
            id='last_name'
            label='Last Name'
            register={register("lastName", {
              required: "* Field is required",
            })}
            errorMess={errors.lastName?.message}
          />
        </div>
        <TextField
          id='password'
          label='Password'
          security
          register={register("password", {
            required: "Field is required",
          })}
        />
        <TextField
          id='confirm_password'
          label='Conform password'
          security
          register={register("confirmPassword", {
            required: "Field is required",
          })}
        />
        <div className='group'>
          <ButtonTextNeumorphism
            width='50%'
            type='reset'
            text='Clear'
            textColor='white'
            onClick={() => {
              reset();
              clearErrors();
            }}
          />
          <ButtonTextNeumorphism
            width='100%'
            type='submit'
            text='Create My Account'
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </FormDecorate>
    );
  }
);

export default RegisterForm;
