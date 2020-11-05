import React from "react";
import { Icon, IconButton } from "@material-ui/core/";

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
      <IconButton
        aria-label="content_copy"
        color="default"
        onClick={() => copyToClipboard}
      >
        Copy
        <Icon>content_copy</Icon>
      </IconButton>
      <textarea ref={textAreaRef} rows={rows} value={generatedTrivia} />
    </div>
  );
};

export default GenerateTrivia;
