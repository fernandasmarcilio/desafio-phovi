import React from "react";

import "./styles.css";
import { Icon } from "@material-ui/core/";

interface GenerateTriviaProps {
  textAreaRef: any;
  generatedTrivia: string;
  rows: number;
  copyToClipboard: Function;
}

const GenerateTrivia: React.FC<GenerateTriviaProps> = ({
  textAreaRef,
  generatedTrivia,
  rows,
  copyToClipboard,
}) => {
  return (
    <div className="generateContainer">
      <button
        type="button"
        className="button-icon button-default"
        onClick={(e) => copyToClipboard(e)}
      >
        Copy
        <Icon>content_copy</Icon>
      </button>

      <textarea ref={textAreaRef} rows={rows} value={generatedTrivia} />
    </div>
  );
};

export default GenerateTrivia;
