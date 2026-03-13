import { Navigate } from "react-router";
import paths from "@/config/paths";
import Page from "@/comp/layout/page";
import AuthPageLayout from "@/comp/layout/auth-page-layout";
import { LoginForm } from "@/features/auth";
import { useUser } from "@/stores/user";

export default function LoginPage() {
    const { data: user } = useUser(false);

    if (user) {
        return <Navigate to={paths.stream.get(user.username)} />;
    }

    return (
        <Page title="Log in" description="">
            <AuthPageLayout
                heading="Log in"
                hint={{
                    text: "Don't have an account?",
                    link: {
                        text: "Register",
                        href: paths.register.path,
                    },
                }}
                form={<LoginForm />}
            />
        </Page>
    );
}
