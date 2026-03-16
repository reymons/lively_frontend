import { Outlet, Link } from "react-router";
import paths from "@/config/paths";
import cn from "classnames";
import { useUser } from "@/stores/user";
import sl from "./main-layout.module.scss";

export default function MainLayout() {
    return (
        <div className={sl.wrapper}>
            <header className={cn(sl.header, "cnt")}>
                <Link className={sl.logo} to={paths.home.path}>
                    LIVELY
                </Link>
                <UserProfile />
            </header>
            <Outlet />
        </div>
    );
}

function UserProfile() {
    const { data: user } = useUser();
    if (!user) return null;

    const png = require("@/assets/images/avatar.png");
    const webp2x = require("@/assets/images/avatar.png?as=webp&w=40");
    const avif2x = require("@/assets/images/avatar.png?as=avif&w=40&q=50");

    return (
        <Link to={paths.stream.get(user.username)}>
            <div className={sl.userProfile}>
                <picture>
                    <source srcSet={avif2x} type="image/avif" />
                    <source srcSet={webp2x} type="image/webp" />
                    <img srcSet={png} width={36} height={36} alt="user profile" />
                </picture>
            </div>
        </Link>
    );
}
