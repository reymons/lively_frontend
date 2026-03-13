import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import LoginForm from "./login-form";

const loginUser = jest.fn();

jest.mock("../api/auth", () => ({
    useLogin: () => loginUser,
}));

test("submits correct data and calls onSuccess", async () => {
    const data = {
        username: faker.internet.username(),
        password: faker.internet.password(),
    };
    const handleSuccess = jest.fn();

    render(<LoginForm onSuccess={handleSuccess} />);
    await userEvent.type(screen.getByLabelText(/username/i), data.username);
    await userEvent.type(screen.getByLabelText(/^password$/i), data.password);
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith(data);
    expect(handleSuccess).toHaveBeenCalledTimes(1);
});
