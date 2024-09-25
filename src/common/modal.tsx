// CustomModal.tsx
import React from "react";
import { Modal, Button } from "antd";

interface CustomModalProps {
  visible: boolean;
  title: string | React.ReactNode;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: "primary" | "default" | "dashed" | "text";
  className?: string;
  showModalFooter?: boolean;
  width?: number | string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  content,
  onCancel,
  onConfirm = () => {},
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonType = "primary",
  className,
  showModalFooter = false,
  width = 'auto'
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={null}
      centered
      className={`rounded-md ${className}`}
      width={width}
    >
      {showModalFooter ? (
        <>
          <div className="mb-4">{content}</div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300"
            >
              {cancelText}
            </Button>
            <Button type={confirmButtonType} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </>
      ) : (
        content
      )}
    </Modal>
  );
};

export default CustomModal;
