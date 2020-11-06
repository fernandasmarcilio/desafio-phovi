import React from "react";

import "./styles.css";
import { MdSend, MdDeleteForever } from "react-icons/md";
import { SiFirebase } from "react-icons/si";

interface ButtonGroupProps {
  handleGenerateTrivia: Function;
  handleResetTrivias: Function;
  handleSendToFirebase: Function;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleGenerateTrivia,
  handleResetTrivias,
  handleSendToFirebase,
}) => {
  return (
    <div className="container-button-group">
      <button
        type="button"
        className="button-icon button-default"
        onClick={() => handleGenerateTrivia()}
      >
        Generate
        <MdSend />
      </button>
      <button
        type="button"
        className="button-icon button-default"
        onClick={() => handleResetTrivias()}
      >
        Reset All
        <MdDeleteForever />
      </button>
      <button
        type="button"
        className="button-icon button-default"
        onClick={() => handleSendToFirebase()}
      >
        Send to firebase
        <SiFirebase />
      </button>
    </div>
  );
};

export default ButtonGroup;
