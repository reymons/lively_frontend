import { useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { type InferType } from "yup";
import cn from "classnames";
import { Form, SubmitButton, Input } from "@ui/form";
import paths from "@/config/paths";
import Button from "@ui/button";
import Heading from "@ui/heading";
import Page from "@/comp/layout/page";
import sl from "./home.module.scss";

export default function HomePage() {
    const [watchStream, setWatchStream] = useState(false);

    return (
        <Page title="Home" description="">
            <main className={cn(sl.wrapper, "cnt")}>
                <Heading withReturn={watchStream} onReturn={() => setWatchStream(false)}>
                    {watchStream ? "What is the streamer's name?" : "What would you like to do?"}
                </Heading>
                {!watchStream && (
                    <>
                        <div className={sl.btns}>
                            <Button onClick={() => setWatchStream(true)}>Watch a stream</Button>
                            <Button asLink to={paths.login.path}>
                                Stream
                            </Button>
                        </div>
                    </>
                )}
                {watchStream && <WatchStreamFlow />}
            </main>
        </Page>
    );
}

function WatchStreamFlow() {
    const navigate = useNavigate();
    const schema = yup.object({
        username: yup.string().required().label("Username"),
    });

    const handleSubmit = async (data: InferType<typeof schema>) => {
        navigate(paths.stream.get(data.username));
    };

    return (
        <>
            <div className={sl.formWrapper}>
                <Form schema={schema} defaultValues={{ username: "" }} onSubmit={handleSubmit}>
                    {({ register, formState }) => (
                        <>
                            <Input
                                reg={register("username")}
                                label="Username"
                                error={formState.errors.username}
                                placeholder="Enter here"
                                autoComplete="off"
                            />
                            <SubmitButton>Watch</SubmitButton>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
