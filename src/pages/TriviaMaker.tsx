import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/App.css";

import firebase from "../firebase";

import Header from "../components/Header";
import ModalLoadTrivia from "../components/ModalLoadTrivia";
import Form from "../components/Form";
import GenerateTrivia from "../components/GenerateTrivia";
import ButtonGroup from "../components/ButtonGroup";

interface TriviaQuestions {
  question: string;
  answers: string;
  correct_answer: string;
}
interface TriviaDeck {
  title: string;
  photoUrl: string;
  deck: Array<TriviaQuestions>;
}

function TriviaMaker() {
  const [triviaType, setTriviaType] = useState("multipleChoice");
  const [triviaTitle, setTriviaTitle] = useState("");
  const [triviaPhotoUrl, setTriviaPhotoUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [generatedTrivia, setGeneratedTrivia] = useState<any>("");
  const [triviaProportion, setTriviaProportion] = useState<any>({});
  const [triviaQuestions, setTriviaQuestions] = useState<Array<any>>(() => {
    const storagedTrivias = localStorage.getItem("@PhoviTriviaMaker:trivias");
    if (storagedTrivias) {
      return JSON.parse(storagedTrivias);
    }
    return [];
  });
  const [data, setData] = useState<any>([]);

  const textAreaRef = useRef<any>(null);

  useEffect(() => {
    if (triviaType === "singleChoice" && triviaQuestions) {
      let trueAnswers = 0;
      let falseAnswers = 0;

      triviaQuestions.map((trivia) => {
        if (trivia.correct_answer === true) {
          trueAnswers += 1;
        } else if (trivia.correct_answer === false) {
          falseAnswers += 1;
        }
      });

      const total = trueAnswers + falseAnswers;

      setTriviaProportion({
        trueAnswers: Math.round((trueAnswers / total) * 100),
        falseAnswers: Math.round((falseAnswers / total) * 100),
      });
    }

    firebase
      .collection("trivias")
      .get()
      .then((snapshot) => {
        const response = [] as any;
        snapshot.forEach((doc) => {
          const docData = doc.data();
          response.push(docData);
        });
        setData(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [triviaType, generatedTrivia, triviaQuestions]);

  function copyToClipboard(e) {
    console.log(typeof textAreaRef);

    if (textAreaRef) {
      textAreaRef.current.select();
      document.execCommand("copy");
      e.target.focus();
    }
  }

  const triviaTypeOptions = [
    {
      value: "singleChoice",
      label: "True/False",
    },
    {
      value: "multipleChoice",
      label: "Multiple Choice",
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTriviaType(event.target.value);
  };

  const handleDelete = (questionIndex) => {
    setTriviaQuestions(
      triviaQuestions.filter((trivia, index) => index !== questionIndex)
    );
  };

  const handleAddQuestion = () => {
    setTriviaQuestions([
      ...triviaQuestions,
      { question: "", answers: "", correct_answer: "" },
    ]);
  };

  const handleChangeTriviaData = (
    parameter: string,
    data: string,
    index: number
  ) => {
    const updatedTrivia = triviaQuestions.map((question, questionIndex) =>
      questionIndex === index ? { ...question, [parameter]: data } : question
    );
    setTriviaQuestions(updatedTrivia);
  };

  const handleGenerateTrivia = () => {
    localStorage.setItem(
      "@PhoviTriviaMaker:trivias",
      JSON.stringify(triviaQuestions)
    );
    const parsedData = triviaQuestions.map((question) => {
      if (question.answers && question.answers.length !== 0) {
        const answersArray = question.answers.split("\n");
        return { ...question, answers: answersArray };
      }
      return question;
    });
    const dataString = JSON.stringify({
      title: triviaTitle,
      photoUrl: triviaPhotoUrl,
      deck: parsedData,
    });
    setGeneratedTrivia(dataString);
  };

  const handleResetTrivias = () => {
    const confirmReset = window.confirm("Are you sure ?");
    if (confirmReset) {
      const easterEggConfirmation = window.confirm(
        "I mean,really really sure?"
      );
      if (easterEggConfirmation) {
        localStorage.clear();
        setTriviaQuestions([]);
        setGeneratedTrivia("");
        setTriviaPhotoUrl("");
        setTriviaTitle("");
      }
    }
  };

  const loadTriviaData = async (selectedTrivia: string) => {
    await firebase
      .collection("trivias")
      .doc(selectedTrivia)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          setTriviaQuestions(docData?.deck);
          setTriviaTitle(docData?.title);
          setTriviaPhotoUrl(docData?.photoUrl);
          setTriviaType(docData?.type);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const handleSendToFirebase = async () => {
    const data = {
      title: triviaTitle,
      photoUrl: triviaPhotoUrl,
      deck: triviaQuestions,
      type: triviaType,
    };

    await firebase
      .collection("trivias")
      .doc(triviaTitle)
      .set(data)
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <Header openModal={openModal} setOpenModal={setOpenModal} />
      <ModalLoadTrivia
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
        loadTriviaData={loadTriviaData}
      />
      <Form
        triviaType={triviaType}
        triviaTypeOptions={triviaTypeOptions}
        triviaTitle={triviaTitle}
        triviaPhotoUrl={triviaPhotoUrl}
        triviaQuestions={triviaQuestions}
        triviaProportion={triviaProportion}
        setTriviaTitle={setTriviaTitle}
        setTriviaPhotoUrl={setTriviaPhotoUrl}
        handleChange={handleChange}
        handleChangeTriviaData={handleChangeTriviaData}
        handleDelete={handleDelete}
        handleAddQuestion={handleAddQuestion}
      />

      {triviaQuestions.length > 0 && (
        <>
          <ButtonGroup
            handleGenerateTrivia={handleGenerateTrivia}
            handleResetTrivias={handleResetTrivias}
            handleSendToFirebase={handleSendToFirebase}
          />

          <GenerateTrivia
            textAreaRef={textAreaRef}
            generatedTrivia={generatedTrivia}
            copyToClipboard={copyToClipboard}
            rows={triviaQuestions.length + 2}
          />
        </>
      )}
    </div>
  );
}

export default TriviaMaker;
