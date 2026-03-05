import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export function mockReg(overrides?: Partial<UseFormRegisterReturn>): UseFormRegisterReturn {
    return {
        name: "field",
        onBlur: () => Promise.resolve(),
        onChange: () => Promise.resolve(),
        ref: () => {},
        ...overrides,
    };
}

export function mockFieldError(overrides?: Partial<FieldError>): FieldError {
    return {
        type: "onChange",
        ...overrides,
    };
}
