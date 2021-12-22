import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  // when user clicks on the first card it will be choiceOne
  const [choiceTwo, setChoiceTwo] = useState(null)
  // when user clicks on the second card it will be the second choice
  const [disabled, setDisabled] = useState(false)

  
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    //creates all the images 2x to a new array
    .sort(() => Math.random() - 0.5)
    //items will randomly move the cards around in the array
    .map((card) => ({ ...card, id: Math.random() }))
    //spread cards to random id numbers

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    //sets shuffled cards
    setTurns(0)
    //sets turns to 0 each time the function to shuffle cards runs.
    
  }

  // console.log(cards, turns)


  //handle a choice
  const handleChoice = (card) => {
  // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {

    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        //if choice one is the same as choice two card there is a match
        // console.log('those cards match')
        setCards(prevCards => {
          // the card state us updated
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
              //returns a new array of cards
            }
          })
        })
        resetTurn()
      } else {
        // console.log('those cards do not match')

        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automatically
  useEffect(() => {
    shuffleCards()

  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (

          <SingleCard 
          key={ card.id } 
          card={ card }
          handleChoice={ handleChoice }
          flipped={ card === choiceOne || card === choiceTwo || card.matched }
          //three scenarios where the card is flipped
          disabled={disabled}
          />

        ))}
      </div>
      <p>Turns: { turns }</p>
    </div>
  );
}

export default App;
