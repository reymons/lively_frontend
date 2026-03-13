import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import paths from "@/config/paths";
import LoadingScreen from "@ui/loading-screen";
import { GuestOnly } from "@/features/auth";

const HomePage = lazy(() => import("./pages/home"));
const StreamPage = lazy(() => import("./pages/stream"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));

const MainLayout = lazy(() => import("@/comp/layout/main-layout"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path={paths.home.path} Component={MainLayout}>
                        <Route path="/:username" Component={StreamPage} />
                        <Route Component={GuestOnly}>
                            <Route index Component={HomePage} />
                            <Route path="/login" Component={LoginPage} />
                            <Route path="/register" Component={RegisterPage} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
