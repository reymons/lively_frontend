import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import paths from "@/config/paths";
import LoadingScreen from "@ui/loading-screen";

const HomePage = lazy(() => import("./pages/home"));
const StreamPage = lazy(() => import("./pages/stream"));

const MainLayout = lazy(() => import("@/comp/layout/main-layout"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path={paths.home.path} Component={MainLayout}>
                        <Route index Component={HomePage} />
                        <Route path="/:username" Component={StreamPage} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
