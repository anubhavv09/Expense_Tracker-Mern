import React, { useEffect, useState } from "react";
import "../Styles/Game.css";
import finance from "./finance.json";
import Navbar from "./Navbar";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setQuestions(finance.questions);
      const shuffledQuestions = finance.questions.sort(
        () => 0.5 - Math.random()
      );
      const random = shuffledQuestions.slice(0, 3);
      setShuffled(random);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setUserResponses([]);
  }, []);

  const countScore = () => {
    let upscore = 0;

    shuffled.forEach((element) => {
      const matching = userResponses.find((result) => {
        return result.id === element.id;
      });

      if (matching.answer === element.correctAnswer) {
        upscore = upscore + 1;
      }
    });
    setScore(upscore);
   
  };

  const handleOptionClick = (questionId, selectedOption) => {
    
    setUserResponses((prevResponses) => [
      ...prevResponses.filter((response) => response.id !== questionId),
      { id: questionId, answer: selectedOption },
    ]);

  };

  useEffect(() => {
    console.log("hit");
  }, [endGame]);

  return (
    <div className="game-main">
      <Navbar />
      <div className="game-header-parent">
        <div className="game-header">
          <p className="finance-p">Finance Game</p>
        </div>
      </div>
      <div className="button-finance">
        <div className="finance-button">
          <button onClick={() => setShow(true)} className="button-finance-2">
            Play
          </button>
        </div>
      </div>

      {show ? (
        <div className="game-show-parent">
        <div className="game-show">
          {shuffled && shuffled.length > 0 ? (
            <>
              {shuffled.map((element, index) => (
                <div key={index} className="questions">
                    <div className="questions-2" style={{paddingTop:"20px"}}>
                    {element.question}
                    </div>
                  <div className="answers">
                    {element.options.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionClick(element.id, result)}
                      >
                        <div className="answers-check">
                        {result}
                        <input type="checkbox"  placeholder={result} className="check-box-1" ></input>
                            </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : null}
          <div className="submit-answers">
            <button type="submit" onClick={countScore} className="button-score">
             Check Score
            </button>
            <button type="submit" onClick={() => window.location.reload()} className="button-score">
              End Game
            </button>
          </div>
          <div className="score-class">
            <h3>{`Your score is ${score}`}</h3>
          </div>
        </div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Game;
