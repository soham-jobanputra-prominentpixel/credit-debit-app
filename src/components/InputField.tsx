import * as React from "react";
import { useField } from "formik";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import { cn } from "./ui/lib/utils.ts";

type InputFieldProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  className,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  const showError = meta.touched && meta.error;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={props.name} className="text-sm font-medium">
          {label}
        </Label>
      )}

      <Input
        id={props.name}
        type={type}
        placeholder={placeholder}
        {...field}
        {...props}
        className={cn(
          showError ? "border-red-500 focus-visible:ring-red-500" : "",
          className,
        )}
      />

      {showError && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};
