import React from "react";
import { Button, Icon } from "@material-ui/core/";

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
    <div>
      <Button
        variant="contained"
        color="default"
        endIcon={<Icon>send</Icon>}
        className="submitButton"
        onClick={() => handleGenerateTrivia()}
      >
        Generate
      </Button>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Icon>delete_forever</Icon>}
        className="buttonSideMargin"
        onClick={() => handleResetTrivias()}
      >
        Reset All
      </Button>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Icon>local_fire_department</Icon>}
        className="buttonSideMargin"
        onClick={() => handleSendToFirebase()}
      >
        Send to firebase
      </Button>
    </div>
  );
};

export default ButtonGroup;
