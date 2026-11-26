import { AlertTriangle } from "lucide-react";

import Modal from "./Modal";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;

  title?: string;
  message: string;

  confirmLabel?: string;
  cancelLabel?: string;

  danger?: boolean;
  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,

  title = "Confirm action",
  message,

  confirmLabel = "Confirm",
  cancelLabel = "Cancel",

  danger = false,
  loading = false,

  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  function handleClose() {
    if (!loading) {
      onCancel();
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      size="sm"
      closeOnBackdrop={!loading}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>

          <Button
            variant={
              danger ? "danger" : "primary"
            }
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="confirm-dialog-content">
        <div
          className={`confirm-dialog-icon ${
            danger
              ? "confirm-danger"
              : ""
          }`}
        >
          <AlertTriangle size={28} />
        </div>

        <p>{message}</p>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;