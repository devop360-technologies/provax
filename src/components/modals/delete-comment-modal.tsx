"use client";

import { AlertTriangle } from "lucide-react";
import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentAuthor?: string;
}

export function DeleteCommentModal({ isOpen, onClose, onConfirm, commentAuthor }: DeleteCommentModalProps) {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Comment"
      titleIcon={
        <div className="rounded-full bg-red-500/20 p-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
      }
      maxWidth="max-w-md"
      actions={
        <>
          <ModalButton onClick={onClose} variant="secondary">
            Cancel
          </ModalButton>
          <ModalButton onClick={handleDelete} variant="danger">
            Delete Comment
          </ModalButton>
        </>
      }
    >
      <p className="text-gray-300">
        Are you sure you want to delete this technical comment
        {commentAuthor && (
          <span className="font-medium text-white"> by {commentAuthor}</span>
        )}?
      </p>
      <p className="mt-2 text-sm text-gray-400">
        This action cannot be undone. The comment will be permanently removed from the certification record.
      </p>
    </ModalWrapper>
  );
}