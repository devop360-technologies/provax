"use client";

import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function ResetPasswordModal({ isOpen, onClose, userName }: ResetPasswordModalProps) {
  const handleEnable = () => {
    // Password reset placeholder - reset password for userName
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Access Reset Password"
      maxWidth="md"
      actions={
        <>
          <ModalButton onClick={handleEnable} variant="primary">
            Enable
          </ModalButton>
          <ModalButton onClick={onClose} variant="secondary">
            Cancel
          </ModalButton>
        </>
      }
    >
      <p className="text-center text-gray-300">
        "Are you sure you want to enable password reset access for{" "}
        <span className="font-semibold text-white">{userName}</span>? Once enabled, the user will be able to reset their own password."
      </p>
    </ModalWrapper>
  );
}