"use client";

import { useState } from "react";
import { ModalWrapper, ModalButton, ModalInput } from "@/components/ui/modal-wrapper";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function AddNoteModal({ isOpen, onClose, userName }: AddNoteModalProps) {
  const [note, setNote] = useState("");

  const handleAddNote = () => {
    if (note.trim()) {
      // Note adding placeholder - use userName and note content
      setNote("");
      onClose();
    }
  };

  const handleCancel = () => {
    setNote("");
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add Internal Note"
      actions={
        <>
          <ModalButton
            onClick={handleAddNote}
            disabled={!note.trim()}
            variant="primary"
          >
            Add Note
          </ModalButton>
          <ModalButton onClick={handleCancel} variant="secondary">
            Cancel
          </ModalButton>
        </>
      }
    >
      <div className="space-y-4">
        <ModalInput
          label="Note"
          value={note}
          onChange={setNote}
          placeholder="Enter internal note..."
          type="textarea"
          rows={4}
        />
      </div>
    </ModalWrapper>
  );
}