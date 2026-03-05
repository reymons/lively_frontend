import { useParams } from "react-router";

type Params = {
    username: string;
};

export default function StreamPage() {
    const { username } = useParams<Params>();
    return <h1>{username}</h1>;
}
