import * as yup from "yup";
import { type InferType } from "yup";
import { Form, Input, PasswordInput, SubmitButton, FormError } from "@ui/form";
import { useRegister } from "../api/auth";

const schema = yup.object({
    username: yup.string().required().min(6).max(40).label("Username"),
    password: yup.string().required().min(6).max(100).label("Password"),
    cpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .label("Confirm password"),
});

type Props = {
    onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: Props) {
    const registerUser = useRegister();

    const handleSubmit = async (data: InferType<typeof schema>) => {
        await registerUser(data);
        onSuccess?.();
    };

    return (
        <>
            <Form
                schema={schema}
                defaultValues={{ username: "", password: "", cpassword: "" }}
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            reg={register("username")}
                            label="Username"
                            placeholder="Enter your username here"
                            error={formState.errors.username}
                            autoComplete="off"
                        />
                        <PasswordInput
                            reg={register("password")}
                            label="Password"
                            placeholder="Enter your password here"
                            error={formState.errors.password}
                            autoComplete="off"
                        />
                        <PasswordInput
                            reg={register("cpassword")}
                            label="Confirm password"
                            placeholder="Enter your password here again"
                            autoComplete="off"
                            error={formState.errors.cpassword}
                        />
                        <FormError />
                        <SubmitButton>Register</SubmitButton>
                    </>
                )}
            </Form>
        </>
    );
}
