import { Outlet } from "react-router";
import cn from "classnames";
import sl from "./main-layout.module.scss";

export default function MainLayout() {
    return (
        <div className={sl.wrapper}>
            <header className={cn(sl.header, "cnt")}>LIVELY</header>
            <Outlet />
        </div>
    );
}
