import React from "react";
import { Modal, Button } from "@material-ui/core/";

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
            <Button
              key={item.title}
              variant="outlined"
              color="primary"
              onClick={() => {
                loadTriviaData(item.title);
                setOpenModal(false);
              }}
              className="buttonMargin"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalLoadTrivia;
