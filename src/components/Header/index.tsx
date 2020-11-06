import React from "react";

import "./styles.css";
import phoviLogo from "../../assets/images/phoviLogo.svg";

interface HeaderProps {
  openModal: boolean;
  setOpenModal: Function;
}

const Header: React.FC<HeaderProps> = ({ openModal, setOpenModal }) => {
  return (
    <header className="App-header">
      <div className="logo-container">
        <img src={phoviLogo} alt="phovi logo" />
        <h3>Trivia Maker</h3>
      </div>
      <button
        type="button"
        className="button"
        onClick={() => setOpenModal(!openModal)}
      >
        Load Trivias
      </button>
    </header>
  );
};

export default Header;
