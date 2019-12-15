import React, { Component } from "react";
import MatchCard from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./card.json";
import "./App.css";

let correctGuesses = 0;
let score = 0;
let clicked = "Click on an image to earn points, but don't click on any more than once!";

class App extends Component {

  state = {
    matches,
    correctGuesses,
    score,
    clicked
  };

  setClicked = id => {

    const matches = this.state.matches;

    const clickedMatch = matches.filter(match => match.id === id);

    if (clickedMatch[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + score);

      correctGuesses = 0;
      clicked = "Ya already clicked this one bud"

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({ clicked });
      this.setState({ correctGuesses });
      this.setState({ matches });


    } else if (correctGuesses < 11) {

      clickedMatch[0].clicked = true;

      correctGuesses++;

      clicked = "Wooooo!";

      if (correctGuesses > score) {
        score = correctGuesses;
        this.setState({ score });
      }

      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clicked });
    } else {

      clickedMatch[0].clicked = true;

      correctGuesses = 0;

      clicked = "Good job!";
      score = 12;
      this.setState({ score });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clicked });

    }
  };

  render() {
    return (
      <Wrapper>
        <Title>Clicky Game</Title>

        <h3 className="scoreSummary">
          {this.state.clicked}
        </h3>

        <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.score}
        </h3>
        <div className="container">
          <div className="row">
            {this.state.matches.map(match => (
              <MatchCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>

      </Wrapper>
    );
  }
}

export default App;