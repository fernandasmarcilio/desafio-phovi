import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  FormControl, FormHelperText, TextField, Modal, Input, InputLabel, Button, MenuItem, Divider,
} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import firebase from './firebase';
import dark from './firebase/dark';

interface TriviaQuestions {
  question: string;
  answers: string;
  correct_answer: string;
}
interface TriviaDeck {
  title: string;
  photoUrl : string;
  deck : Array<TriviaQuestions>;
}

function App() {
  const [triviaType, setTriviaType] = useState('multipleChoice');
  const [triviaTitle, setTriviaTitle] = useState('');
  const [triviaPhotoUrl, setTriviaPhotoUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [typingTimer, setTypingTimer] = useState<any>(null);
  const [modalData, setModalData] = useState<Array<any>>(['dark',
  'disneyClassics',
  'friends',
  'gameOfThrones',
  'generalKnowledge',
  'harryPotter',
  'horrorMovies',
  'music',
  'peakyBlinders',
  'sports',
  'technology',
  'theOffice']);
  const [generatedTrivia, setGeneratedTrivia] = useState<any>('');
  const [triviaProportion,setTriviaProportion] = useState<any>({});
  const [triviaQuestions, setTriviaQuestions] = useState<Array<any>>(() => {
    const storagedTrivias = localStorage.getItem(
      '@PhoviTriviaMaker:trivias',
    );
    if (storagedTrivias) {
      return JSON.parse(storagedTrivias);
    }
    return [];
  });

  const textAreaRef = useRef<any>(null);

  useEffect(()=>{
      if(triviaType==='singleChoice' && triviaQuestions){
        let trueAnswers = 0;
        let falseAnswers = 0;
        triviaQuestions.map(trivia => {
          if(trivia.correct_answer== true){
          trueAnswers+=1;
        }else if(trivia.correct_answer == false){
          falseAnswers+=1;
        }})
        const total = trueAnswers+falseAnswers;
        setTriviaProportion({
          trueAnswers : Math.round(trueAnswers/total*100),
          falseAnswers:  Math.round(falseAnswers/total*100)
        });
      }
  },[triviaType,generatedTrivia,triviaQuestions])

  function copyToClipboard(e) {
    if (textAreaRef) {
      textAreaRef.current.select();
      document.execCommand('copy');
      e.target.focus();
    }
  }

  const triviaTypeOptions = [
    {
      value: 'singleChoice',
      label: 'True/False',
    }, {
      value: 'multipleChoice',
      label: 'Multiple Choice',
    }];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTriviaType(event.target.value);
  };

  const handleDelete = (questionIndex) => {
    setTriviaQuestions(triviaQuestions.filter((trivia, index) => index !== questionIndex));
  };

  const handleAddQuestion = () => {
    setTriviaQuestions([...triviaQuestions, { question: '', answers: '', correct_answer: '' }]);
  };

  const handleChangeTriviaData = (parameter:string, data:string, index:number) => {
    const updatedTrivia = triviaQuestions.map(
      (question, questionIndex) => (questionIndex === index
        ? {...question,[parameter]: data } : question),
    );
    setTriviaQuestions(updatedTrivia);
  };


  const handleGenerateTrivia = () => {
    localStorage.setItem(
      '@PhoviTriviaMaker:trivias', JSON.stringify(triviaQuestions),
    );
    const parsedData = triviaQuestions.map((question) => {
      if (question.answers && question.answers.length !== 0) {
        const answersArray = question.answers.split('\n');
        return { ...question, answers: answersArray };
      }
      return question;
    });
    const dataString = JSON.stringify(
      { title: triviaTitle, photoUrl: triviaPhotoUrl, deck : parsedData },
    );
    setGeneratedTrivia(dataString);
  };

  const handleResetTrivias = () => {
    const confirmReset = window.confirm('Are you sure ?');
    if (confirmReset) {
      const easterEggConfirmation = window.confirm('I mean,really really sure?');
      if(easterEggConfirmation){
        localStorage.clear();
        setTriviaQuestions([]);
        setGeneratedTrivia('');
        setTriviaPhotoUrl('');
        setTriviaTitle('');
      }
    }
  };


  const loadTriviaData = async (selectedTrivia)=>  {
     setTriviaQuestions(dark?.deck);
      setTriviaTitle(dark?.title);
      setTriviaPhotoUrl(dark?.photoUrl);
      setTriviaType('singleChoice')
    // await firebase.firestore().collection('trivias').doc(selectedTrivia).get()
    //     .then((doc) => {
    //       const data = /codigo aqui*/
    //       setTriviaQuestions(data?.deck);
    //       setTriviaTitle(data?.title);
    //       setTriviaPhotoUrl(data?.photoUrl);
    //       setTriviaType('singleChoice')
    //     });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Trivia Maker
        </h3>
        <Button
          variant="outlined"
          color="default"
          onClick={() => setOpenModal(!openModal)}
          className="addTriviaButton"
        >
          Load Trivias
        </Button>
      </header>
      <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="modal"
        >
        <div className="modalContainer">
        <h2>Select one trivia</h2>
        <div>
          {modalData.map(item => <Button
          variant="outlined"
          color="primary"
          onClick={()=>{
            loadTriviaData(item);
            setOpenModal(false);
          }}
          className="buttonMargin"
          >
          {item}
        </Button>)}
        </div>
      </div>
      </Modal>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-select-triviaType"
          select
          label="Trivia type"
          value={triviaType}
          onChange={handleChange}
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
          Questions
          {' '}
          {triviaQuestions.length > 0 && `(${triviaQuestions.length})`}
          {'   '}
          {triviaType==='singleChoice' && ` True=${triviaProportion.trueAnswers}% False=${triviaProportion.falseAnswers}%`}
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
              onChange={(e) => handleChangeTriviaData('question', e.target.value, index)}
            />
           {triviaType==='multipleChoice' && <Tooltip title="Separe as alternativas com enter">
              <TextField
                value={question.answers}
                className="question"
                id="answers"
                label="Answers"
                multiline
                rowsMax={500}
                variant="outlined"
                onChange={(e) => handleChangeTriviaData('answers', e.target.value, index)}
              />
            </Tooltip>}
            <TextField
              className="question"
              id="correct_answer"
              label="Correct answer"
              multiline
              value={question.correct_answer}
              rowsMax={500}
              variant="outlined"
              onChange={(e) => handleChangeTriviaData('correct_answer', e.target.value, index)}
            />
            <IconButton aria-label="delete" color="default" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
          className="addTriviaButton"
        >
          Add question
        </Button>
        {triviaQuestions.length > 0 && (
          <div>
            <Button
              variant="contained"
              color="default"
              endIcon={<Icon>send</Icon>}
              className="submitButton"
              onClick={handleGenerateTrivia}
            >
              Generate
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Icon>delete_forever</Icon>}
              className="buttonSideMargin"
              onClick={handleResetTrivias}
            >
              Reset All
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Icon>local_fire_department</Icon>}
              className="buttonSideMargin"
              onClick={() => alert('function de enviar pro firebase')}
            >
              Send to firebase
            </Button>
          </div>
        )}
      </form>
      {triviaQuestions.length > 0
      && (
      <div className="generateContainer">
        <IconButton aria-label="content_copy" color="default" onClick={copyToClipboard}>
          Copy
          <Icon>content_copy</Icon>
        </IconButton>
        <textarea ref={textAreaRef} rows={triviaQuestions.length + 2} value={generatedTrivia} />
      </div>
      )}
    </div>
  );
}

export default App;
