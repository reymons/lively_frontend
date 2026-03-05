import type { FieldError } from "react-hook-form";
import cn from "classnames";
import sl from "./form-field.module.scss";

export type FormFieldExtProps = Omit<Props, "children" | "labelId">;

type Props = {
    children: React.ReactNode;
    label: string;
    labelId: string;
    error: FieldError | undefined;
};

export const FormField = ({ label, labelId, children, error }: Props) => {
    const hasError = !!error;

    return (
        <div>
            <div className={cn(sl.label, hasError && sl.error)} id={labelId} aria-live="polite">
                {hasError ? error.message : label}
            </div>
            {children}
        </div>
    );
};
