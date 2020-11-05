import React from "react";
import {
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Button,
  Icon,
} from "@material-ui/core/";
import { Delete } from "@material-ui/icons";

interface FormProps {
  triviaType: string;
  triviaTitle: string;
  triviaPhotoUrl: string;
  triviaQuestions: Array<{
    question: string;
    answers: string;
    correct_answer: string;
  }>;
  triviaProportion: {
    trueAnswers: number;
    falseAnswers: number;
  };

  triviaTypeOptions: Array<{
    value: string;
    label: string;
  }>;

  setTriviaPhotoUrl: Function;
  setTriviaTitle: Function;
  handleChange: Function;
  handleChangeTriviaData: Function;
  handleDelete: Function;
  handleAddQuestion: Function;
}

const Form: React.FC<FormProps> = ({
  triviaType,
  triviaTypeOptions,
  triviaTitle,
  triviaPhotoUrl,
  triviaQuestions,
  triviaProportion,
  setTriviaTitle,
  setTriviaPhotoUrl,
  handleChange,
  handleChangeTriviaData,
  handleDelete,
  handleAddQuestion,
}) => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="standard-select-triviaType"
        select
        label="Trivia type"
        value={triviaType}
        onChange={() => handleChange()}
      >
        {triviaTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="name"
        value={triviaTitle}
        label="Trivia Name"
        multiline
        rowsMax={4}
        variant="outlined"
        onChange={(e) => setTriviaTitle(e.target.value)}
      />
      <TextField
        id="picture"
        value={triviaPhotoUrl}
        label="Cover Picture URL"
        multiline
        rowsMax={4}
        variant="outlined"
        onChange={(e) => setTriviaPhotoUrl(e.target.value)}
      />
      <h3>
        Questions {triviaQuestions.length > 0 && `(${triviaQuestions.length})`}
        {"   "}
        {triviaType === "singleChoice" &&
          ` True=${triviaProportion.trueAnswers}% False=${triviaProportion.falseAnswers}%`}
      </h3>
      {triviaQuestions.map((question, index) => (
        <div className="questionContainer" key={index.toString()}>
          <h5>{index + 1}</h5>
          <TextField
            id="question"
            label="Question"
            value={question.question}
            multiline
            rowsMax={500}
            variant="outlined"
            onChange={(e) =>
              handleChangeTriviaData("question", e.target.value, index)
            }
          />
          {triviaType === "multipleChoice" && (
            <Tooltip title="Separe as alternativas com enter">
              <TextField
                value={question.answers}
                className="question"
                id="answers"
                label="Answers"
                multiline
                rowsMax={500}
                variant="outlined"
                onChange={(e) =>
                  handleChangeTriviaData("answers", e.target.value, index)
                }
              />
            </Tooltip>
          )}
          <TextField
            className="question"
            id="correct_answer"
            label="Correct answer"
            multiline
            value={question.correct_answer}
            rowsMax={500}
            variant="outlined"
            onChange={(e) =>
              handleChangeTriviaData("correct_answer", e.target.value, index)
            }
          />
          <IconButton
            aria-label="delete"
            color="default"
            onClick={() => handleDelete(index)}
          >
            <Delete />
          </IconButton>
        </div>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddQuestion()}
        className="addTriviaButton"
      >
        Add question
      </Button>
    </form>
  );
};

export default Form;
