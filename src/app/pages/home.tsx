import { useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { type InferType } from "yup";
import cn from "classnames";
import { Form, SubmitButton, Input } from "@ui/form";
import paths from "@/config/paths";
import Button from "@ui/button";
import FlatIcon from "@ui/flat-icon";
import sl from "./home.module.scss";

export default function HomePage() {
    const [formType, setFormType] = useState<"watch-stream" | "stream" | "none">("none");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <main className={cn(sl.wrapper, "cnt")}>
            <div className={sl.title}>
                {formType !== "none" && (
                    <button
                        className="icon-btn"
                        type="button"
                        onClick={() => {
                            setFormType("none");
                            setUsername("");
                        }}
                    >
                        <FlatIcon type="arrow-left" />
                    </button>
                )}
                <h1>
                    {formType === "none"
                        ? "What would you like to do?"
                        : formType === "watch-stream"
                          ? "What is the streamer's username?"
                          : username
                            ? "Stream set-up"
                            : "Type in your desired username"}
                </h1>
            </div>
            {formType === "none" && (
                <div className={sl.btns}>
                    <Button onClick={() => setFormType("watch-stream")}>Watch a stream</Button>
                    <Button onClick={() => setFormType("stream")}>Stream</Button>
                </div>
            )}
            {formType !== "none" && (
                <div className={sl.formWrapper}>
                    {formType === "watch-stream" && (
                        <WatchStreamForm
                            onSuccess={username => navigate(paths.stream.get(username))}
                        />
                    )}
                    {formType === "stream" && !username && (
                        <StreamForm onSuccess={username => setUsername(username)} />
                    )}
                </div>
            )}
            {username && (
                <div className={sl.usernameInfo}>
                    <p>
                        Specify the provided URL in your streaming application. After that, you can
                        start streaming
                    </p>
                    <p className={sl.streamUrl}>
                        rtmps://{location.hostname}:1935/streams/{username}
                    </p>
                    <Button className={sl.streamBtn} asLink to={paths.stream.get(username)}>
                        Go to my stream
                    </Button>
                </div>
            )}
        </main>
    );
}

function WatchStreamForm({ onSuccess }: { onSuccess: (username: string) => void }) {
    const schema = yup.object({
        username: yup.string().required().label("Username"),
    });

    const handleSubmit = async (data: InferType<typeof schema>) => {
        onSuccess(data.username);
    };

    return (
        <Form schema={schema} defaultValues={{ username: "" }} onSubmit={handleSubmit}>
            {({ register, formState }) => (
                <>
                    <Input
                        reg={register("username")}
                        error={formState.errors.username}
                        placeholder="Enter here"
                        autoComplete="off"
                    />
                    <SubmitButton>Watch</SubmitButton>
                </>
            )}
        </Form>
    );
}

function StreamForm({ onSuccess }: { onSuccess: (username: string) => void }) {
    const schema = yup.object({
        username: yup.string().required().label("Username"),
    });

    const handleSubmit = async (data: InferType<typeof schema>) => {
        onSuccess(data.username);
    };

    return (
        <Form schema={schema} defaultValues={{ username: "" }} onSubmit={handleSubmit}>
            {({ register, formState }) => (
                <>
                    <Input
                        reg={register("username")}
                        error={formState.errors.username}
                        placeholder="Enter here"
                        autoComplete="off"
                    />
                    <SubmitButton>Continue</SubmitButton>
                </>
            )}
        </Form>
    );
}
