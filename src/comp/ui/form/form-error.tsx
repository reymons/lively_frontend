import { useFormState } from "react-hook-form";
import cn from "classnames";
import sl from "./form-error.module.scss";

export const FormError = () => {
    const { errors } = useFormState();

    return errors.root ? <div className={cn(sl.error, "fsm-sm")}>{errors.root.message}</div> : null;
};
