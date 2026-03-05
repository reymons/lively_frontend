import { type ModalProps, Modal, useModal } from "@/lib/modal";

type Props = Partial<Omit<ModalProps, "component">> & {
    children: ModalProps["children"];
};

export const TestModal = (props: Props) => {
    const modal = useModal();

    return <Modal ref={modal.ref} root={document.body} defaultOpen {...props} />;
};
