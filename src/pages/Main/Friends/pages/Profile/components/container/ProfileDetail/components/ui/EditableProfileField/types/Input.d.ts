type BaseInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type BaseTextareaProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface SubProps extends BaseInputProps, BaseTextareaProps {
  type?: "text" | "textarea";
  register?: any;
}
