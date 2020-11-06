import React from "react";

import "./styles.css";
import { Icon } from "@material-ui/core/";

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
        <Icon>send</Icon>
      </button>
      <button
        type="button"
        className="button-icon button-default"
        onClick={() => handleResetTrivias()}
      >
        Reset All
        <Icon>delete_forever</Icon>
      </button>
      <button
        type="button"
        className="button-icon button-default"
        onClick={() => handleSendToFirebase()}
      >
        Send to firebase
        <Icon>local_fire_department</Icon>
      </button>
    </div>
  );
};

export default ButtonGroup;
