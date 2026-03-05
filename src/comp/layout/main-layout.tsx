import { Outlet, Link } from "react-router";
import paths from "@/config/paths";
import cn from "classnames";
import sl from "./main-layout.module.scss";

export default function MainLayout() {
    return (
        <div className={sl.wrapper}>
            <header className={cn(sl.header, "cnt")}>
                <Link className={sl.logo} to={paths.home.path}>
                    LIVELY
                </Link>
            </header>
            <Outlet />
        </div>
    );
}
