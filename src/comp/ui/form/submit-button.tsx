import Button, { type ButtonProps } from "@ui/button";
import { useFormContext } from "react-hook-form";

type Props = Omit<ButtonProps<false>, "loading" | "type" | "asLink">;

export const SubmitButton = (props: Props) => {
    const { formState } = useFormContext();
    const { isSubmitting, isSubmitSuccessful } = formState;

    return (
        <Button
            stretch
            {...props}
            loading={isSubmitting}
            disabled={isSubmitSuccessful}
            type="submit"
        />
    );
};
