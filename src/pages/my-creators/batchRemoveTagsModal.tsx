// BatchRemoveTagsModal.tsx
import React from "react";
import CustomModal from "../../common/modal";

interface BatchRemoveTagsModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const BatchRemoveTagsModal: React.FC<BatchRemoveTagsModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <CustomModal
      visible={visible}
      title="Batch remove tags"
      content={
        <p className="text-gray-500">
          All assigned tags will be removed from selected creators. Do you want
          to proceed?
        </p>
      }
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmText="Remove tags"
      cancelText="I changed my mind!"
      confirmButtonType="primary"
      className="rounded-lg"
    />
  );
};

export default BatchRemoveTagsModal;
