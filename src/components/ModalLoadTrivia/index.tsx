import React from "react";

import "./styles.css";
import { Modal } from "@material-ui/core/";

interface ModalProps {
  openModal: boolean;
  data: Array<{
    title: string;
  }>;
  setOpenModal: Function;
  loadTriviaData: Function;
}

const ModalLoadTrivia: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  data,
  loadTriviaData,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      className="modal"
    >
      <div className="modalContainer">
        <h2>Select one trivia</h2>
        <div>
          {data.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                loadTriviaData(item.title);
                setOpenModal(false);
              }}
              className="button button-default"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalLoadTrivia;
