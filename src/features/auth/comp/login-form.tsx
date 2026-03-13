import * as yup from "yup";
import { type InferType } from "yup";
import { Form, Input, PasswordInput, SubmitButton, FormError } from "@ui/form";
import { useLogin } from "../api/auth";

const schema = yup.object({
    username: yup.string().required().label("Username"),
    password: yup.string().required().label("Password"),
});

type Props = {
    onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: Props) {
    const loginUser = useLogin();

    const handleSubmit = async (data: InferType<typeof schema>) => {
        await loginUser(data);
        onSuccess?.();
    };

    return (
        <>
            <Form
                schema={schema}
                defaultValues={{ username: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            reg={register("username")}
                            label="Username"
                            placeholder="Enter your username here"
                            error={formState.errors.username}
                            autoComplete="none"
                        />
                        <PasswordInput
                            reg={register("password")}
                            label="Password"
                            placeholder="Enter your password here"
                            error={formState.errors.password}
                            autoComplete="current-password"
                        />
                        <FormError />
                        <SubmitButton>Log in</SubmitButton>
                    </>
                )}
            </Form>
        </>
    );
}
