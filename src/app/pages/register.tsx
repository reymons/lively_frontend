import paths from "@/config/paths";
import { RegisterForm } from "@/features/auth";
import { useStreamKey } from "@/stores/stream-key";
import { useUser } from "@/stores/user";
import Page from "@/comp/layout/page";
import AuthPageLayout from "@/comp/layout/auth-page-layout";
import Button from "@ui/button";
import SecretDisplay from "@ui/secret-display";
import sl from "./register.module.scss";

export default function RegisterPage() {
    const { data: user } = useUser(false);
    const { data: streamKey } = useStreamKey(false);
    const registered = !!user;
    const sk = streamKey?.stream_key ?? "";

    return (
        <Page title="Register" description="">
            <AuthPageLayout
                heading={registered ? "Stream set-up" : "Create an account"}
                form={registered ? null : <RegisterForm />}
                hint={{
                    text: "Already have an account?",
                    link: { text: "Log in", href: paths.login.path },
                }}
            >
                {registered && (
                    <div className={sl.usernameInfo}>
                        <p className="fsm-sm">
                            Specify the provided URL in your streaming application. After that, you
                            can start streaming. Do not share this URL with anybody
                        </p>
                        <SecretDisplay
                            base={`rtmps://${location.hostname}:1935/live/`}
                            secret={sk}
                            visibleStart={6}
                            visibleEnd={5}
                        />
                        <Button
                            className={sl.streamBtn}
                            asLink
                            to={paths.stream.get(user?.username)}
                        >
                            Go to my stream
                        </Button>
                    </div>
                )}
            </AuthPageLayout>
        </Page>
    );
}
