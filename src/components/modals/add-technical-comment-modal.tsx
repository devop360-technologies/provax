"use client";

import React, { useState } from "react";
import { ModalWrapper, ModalButton, ModalInput, ModalDropdown, ModalCheckbox } from "@/components/ui/modal-wrapper";

interface AddTechnicalCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (commentData: {
    commentType: string;
    aiModule: string;
    priority: string;
    comment: string;
    requiresFollowUp: boolean;
  }) => void;
  editData?: {
    commentType: string;
    aiModule: string;
    priority: string;
    comment: string;
    requiresFollowUp: boolean;
  } | null;
  isEditing?: boolean;
}

const commentTypes = [
  "Technical Override",
  "Quality Assurance",
  "Safety Concern",
  "Process Improvement",
  "Documentation Update"
] as const;

const aiModules = [
  "Structure Analysis",
  "Paint Analysis", 
  "Ballistic Glass",
  "Interior Inspection",
  "Functionality Test",
  "Overall Assessment"
] as const;

const priorities = ["Low", "Medium", "High", "Critical"] as const;

const defaultValues = {
  commentType: "Technical Override",
  aiModule: "Structure Analysis",
  priority: "Medium",
  comment: "",
  requiresFollowUp: false,
};

export function AddTechnicalCommentModal({ isOpen, onClose, onSave, editData, isEditing = false }: AddTechnicalCommentModalProps) {
  const [commentType, setCommentType] = useState(editData?.commentType || defaultValues.commentType);
  const [aiModule, setAiModule] = useState(editData?.aiModule || defaultValues.aiModule);
  const [priority, setPriority] = useState(editData?.priority || defaultValues.priority);
  const [comment, setComment] = useState(editData?.comment || defaultValues.comment);
  const [requiresFollowUp, setRequiresFollowUp] = useState(editData?.requiresFollowUp || defaultValues.requiresFollowUp);

  // Update state when editData changes
  React.useEffect(() => {
    if (editData) {
      setCommentType(editData.commentType);
      setAiModule(editData.aiModule);
      setPriority(editData.priority);
      setComment(editData.comment);
      setRequiresFollowUp(editData.requiresFollowUp);
    } else {
      setCommentType(defaultValues.commentType);
      setAiModule(defaultValues.aiModule);
      setPriority(defaultValues.priority);
      setComment(defaultValues.comment);
      setRequiresFollowUp(defaultValues.requiresFollowUp);
    }
  }, [editData]);

  const resetForm = () => {
    if (!isEditing) {
      setCommentType(defaultValues.commentType);
      setAiModule(defaultValues.aiModule);
      setPriority(defaultValues.priority);
      setComment(defaultValues.comment);
      setRequiresFollowUp(defaultValues.requiresFollowUp);
    }
  };

  const handleSave = () => {
    if (comment.trim()) {
      onSave({
        commentType,
        aiModule,
        priority,
        comment: comment.trim(),
        requiresFollowUp
      });
      resetForm();
      onClose();
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Technical Comment" : "Add Technical Comment"}
      actions={
        <>
          <ModalButton onClick={handleCancel} variant="secondary">
            Cancel
          </ModalButton>
          <ModalButton
            onClick={handleSave}
            disabled={!comment.trim()}
            variant="primary"
          >
            {isEditing ? "Update Comment" : "Save Comment"}
          </ModalButton>
        </>
      }
    >
      <div className="space-y-6">
        <ModalDropdown
          label="Comment Type"
          value={commentType}
          onChange={setCommentType}
          options={commentTypes}
        />

        <ModalDropdown
          label="AI Module"
          value={aiModule}
          onChange={setAiModule}
          options={aiModules}
        />

        <ModalDropdown
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={priorities}
        />

        <ModalInput
          label="Comment"
          value={comment}
          onChange={setComment}
          placeholder="Enter your technical comment or override reason..."
          type="textarea"
          rows={4}
        />

        <ModalCheckbox
          id="requiresFollowUp"
          label="Requires follow-up action"
          checked={requiresFollowUp}
          onChange={setRequiresFollowUp}
        />
      </div>
    </ModalWrapper>
  );
}