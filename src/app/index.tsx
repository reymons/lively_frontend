import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setModalRoot } from "@/lib/modal";
import AppProvider from "./provider";
import AppRouter from "./router";
import "./styles/global.scss";

const modalRoot = document.getElementById("modal-root");
if (!modalRoot) throw new Error("No modal root");
setModalRoot(modalRoot);

const rootEl = document.getElementById("app");
if (!rootEl) throw new Error("No root element");
const root = createRoot(rootEl);

root.render(
    <StrictMode>
        <AppProvider>
            <AppRouter />
        </AppProvider>
    </StrictMode>
);
