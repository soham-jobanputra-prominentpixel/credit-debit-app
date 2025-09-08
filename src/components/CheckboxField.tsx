import * as React from "react";
import { useField } from "formik";
import { Checkbox } from "./ui/checkbox.tsx";
import { Label } from "./ui/label.tsx";

type CheckboxFieldProps = {
  name: string;
  label: string;
  className?: string;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  className,
}) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });

  const showError = meta.touched && meta.error;

  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={field.value || false}
          onCheckedChange={(checked) => helpers.setValue(!!checked)}
          className={className}
        />
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      </div>
      {showError && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};
