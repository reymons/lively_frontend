import { useRef } from "react";
import { Navigate, Outlet } from "react-router";
import { useUser } from "@/stores/user";
import paths from "@/config/paths";

export default function GuestOnly() {
    const { data: user, isFetched } = useUser();
    const forceRenderRef = useRef(false);

    if (!isFetched) {
        return <></>;
    }

    if (user && !forceRenderRef.current) {
        return <Navigate to={paths.stream.get(user.username)} replace />;
    }

    forceRenderRef.current = true;
    return <Outlet />;
}
