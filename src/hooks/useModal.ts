import { useState, useEffect } from "react";

const useModal = () => {
  const [modals, setModals] = useState({});
  const [activeButton, setActiveButton] = useState(null);

  const toggleModal = (id: any) => {
    setModals((prev:any) => {
      const newModals = Object.keys(prev).reduce((acc: any, key: any) => {
        acc[key] = false;
        return acc;
      }, {});

      const isActive:any = !prev[id];
      if (isActive) {
        setActiveButton(id);
      } else {
        setActiveButton(null);
      }

      return { ...newModals, [id]: isActive };
    });
  };

  const openModal = (id:any) => {
    setModals((prev) => ({ ...prev, [id]: true }));
    setActiveButton(id);
  };

  const closeModal = (id:any) => {
    setModals((prev) => ({ ...prev, [id]: false }));
    setActiveButton(null);
  };

  const closeAllModals = () => {
    setModals({});
    setActiveButton(null);
  };

  useEffect(() => {
    const handleEsc = (event:any) => {
      if (event.keyCode === 27) {
        closeAllModals();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return {
    modals,
    activeButton,
    toggleModal,
    openModal,
    closeModal,
  };
};

export default useModal;
