import React from "react";
import { Button } from "@material-ui/core/";

interface HeaderProps {
  openModal: boolean;
  setOpenModal: Function;
}

const Header: React.FC<HeaderProps> = ({ openModal, setOpenModal }) => {
  return (
    <header className="App-header">
      <h3>Trivia Maker</h3>
      <Button
        variant="outlined"
        color="default"
        onClick={() => setOpenModal(!openModal)}
        className="addTriviaButton"
      >
        Load Trivias
      </Button>
    </header>
  );
};

export default Header;
