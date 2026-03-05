import "@testing-library/jest-dom";
import { restServer } from "./server";
import { setModalRoot } from "@/lib/modal";

beforeAll(() => {
    restServer.listen();
    setModalRoot(document.body);
});
afterEach(() => {
    restServer.resetHandlers();
});
afterAll(() => restServer.close());
