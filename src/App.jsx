import { useState } from "react";
import Card from "./components/Card";
import { nanoid } from "nanoid";

const App = () => {
  const [playCards, setPlayCards] = useState(allNewDice());

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
    setPlayCards((oldCard) =>
      oldCard.map((card) => {
        return card.isHeld ? card : generateCards();
      })
    );
  }

  function flipCard(id) {
    setPlayCards((oldCard) =>
      oldCard.map((card) => {
        return card.id === id ? { ...card, isHeld: !card.isHeld } : card;
      })
    );
  }

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
      <h1 className="title">Get Them All</h1>
      <p className="instructions ">Roll until all cards are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="card-container">{cardsElement}</div>
      <button className="roll-cards" onClick={rollCards}>
        Roll Cards
      </button>
    </main>
  );
};

export default App;
