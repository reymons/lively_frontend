import { useRef } from "react";
import type { InferType, ObjectSchema } from "yup";
import type { UseFormProps, FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import sl from "./form.module.scss";

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

type Schema = ObjectSchema<any>;

type Props<S extends Schema, T extends FieldValues = InferType<S>> = {
    defaultValues: T;
    schema: S;
    onSubmit: SubmitHandler<T>;
    children: (
        form: UseFormReturn<T> & { formRef: React.RefObject<HTMLFormElement | null> }
    ) => React.ReactNode;
    options?: Omit<UseFormProps<T>, "defaultValues" | "resolver">;
};

export type FormProps<S extends Schema, T extends FieldValues = InferType<S>> = {
    defaultValues?: T | null;
    onSubmit: (data: T) => Promise<void>;
};

export const Form = <S extends Schema, T = InferType<S>>({
    defaultValues,
    schema,
    onSubmit,
    children,
    options,
}: Props<S>) => {
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        ...options,
    });

    const handleSubmit: SubmitHandler<T> = async data => {
        try {
            await onSubmit(data);
        } catch (err) {
            form.setError("root", {
                message: err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE,
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className={sl.form} onSubmit={form.handleSubmit(handleSubmit)} ref={formRef}>
                {children({
                    ...form,
                    formRef,
                })}
            </form>
        </FormProvider>
    );
};
