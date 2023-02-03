import { useState, useEffect, useCallback } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => setIsOpen(false), []);

  const closeModalWithEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      handleCloseModal();
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeModalWithEsc);

    return () => window.removeEventListener("keydown", closeModalWithEsc);
  }, [closeModalWithEsc]);

  return {
    isOpen,
    handleCloseModal,
    handleOpenModal,
  };
};
