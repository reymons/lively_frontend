import { useParams } from "react-router";

type Params = {
    username: string;
};

export default function StreamPage() {
    const { username } = useParams<Params>();
    return (
        <main className="cnt">
            <h1>{username}</h1>
        </main>
    );
}
