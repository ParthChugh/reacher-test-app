// CustomModal.tsx
import React from "react";
import { Modal, Button } from "antd";

interface CustomModalProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: "primary" | "default" | "dashed" | "text";
  className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  content,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonType = "primary",
  className,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={null}
      centered
      className={`rounded-md ${className}`}
    >
      <div className="mb-4">{content}</div>
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel} className="bg-gray-200 hover:bg-gray-300">
          {cancelText}
        </Button>
        <Button type={confirmButtonType} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
