import {
  useEffect,
  useId,
  useRef,
} from "react";

import type { ReactNode } from "react";

import { createPortal } from "react-dom";

import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;

  title: string;
  description?: string;

  children: ReactNode;
  footer?: ReactNode;

  size?: "sm" | "md" | "lg";
  closeOnBackdrop?: boolean;
}

function Modal({
  open,
  onClose,

  title,
  description,

  children,
  footer,

  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  const dialogRef =
    useRef<HTMLDialogElement>(null);

  const titleId = useId();

  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`ui-modal modal-${size}`}
      aria-labelledby={titleId}
      aria-describedby={
        description
          ? descriptionId
          : undefined
      }
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (
          closeOnBackdrop &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2 id={titleId}>
              {title}
            </h2>

            {description && (
              <p id={descriptionId}>
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </dialog>,
    document.body
  );
}

export default Modal;