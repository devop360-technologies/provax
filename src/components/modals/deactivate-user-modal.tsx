"use client";

import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

interface DeactivateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function DeactivateUserModal({ isOpen, onClose, userName }: DeactivateUserModalProps) {
  const handleDeactivate = () => {
    // User deactivation placeholder - deactivate userName
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Deactive User"
      maxWidth="md"
      actions={
        <>
          <ModalButton onClick={handleDeactivate} variant="primary">
            Ok
          </ModalButton>
          <ModalButton onClick={onClose} variant="secondary">
            Cancel
          </ModalButton>
        </>
      }
    >
      <p className="text-center text-gray-300">
        Are you sure you want to deactivate this user?
      </p>
    </ModalWrapper>
  );
}