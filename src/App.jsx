import { useState } from "react";
import Card from "./components/Card";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";

const App = () => {
  const [playCards, setPlayCards] = useState(allNewDice());
  const [gotThemAll, setGotThemAll] = useState(false);

  function generateCards() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(generateCards());
    }
    return cards;
  }

  function rollCards() {
    if (!gotThemAll) {
      setPlayCards((oldCard) =>
        oldCard.map((card) => {
          return card.isHeld ? card : generateCards();
        })
      ) 
    } else {
      setGotThemAll(false)
      setPlayCards(allNewDice)
    }
  }

  function flipCard(id) {
    setPlayCards((oldCard) =>
      oldCard.map((card) => {
        return card.id === id ? { ...card, isHeld: !card.isHeld } : card;
      })
    );
  }

  useEffect(() => {
    const allHeld = playCards.every((item) => item.isHeld);
    const firstValue = playCards[0].value;
    const allTheSameValue = playCards.every(
      (card) => card.value === firstValue
    );
    if (allHeld && allTheSameValue) {
      setGotThemAll(true);
    }
  }, [playCards]);

  const cardsElement = playCards.map((card) => (
    <Card
      key={card.id}
      value={card.value}
      isHeld={card.isHeld}
      flipCard={() => flipCard(card.id)}
    />
  ));

  return (
    <main>
      {gotThemAll && <Confetti />}
      <h1 className="title">Get Them All</h1>
      <p className="instructions ">
        Roll until all cards are the same. Click each die to freeze it at its
        current value between rolls. <br /> Don&apos;t forget the number you
        flipped!
      </p>
      <div className="card-container">{cardsElement}</div>
      <button
        className="roll-cards"
        onClick={rollCards}
      >
        {gotThemAll ? "New Game" : "Roll Cards"}
      </button>
    </main>
  );
};

export default App;
