class App extends React.Component {
  constructor() {
    super();
    this.onCardClick = this.onCardClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      deck: [],
      gameStart: false,
      sets: 0,
      invalidSets: 0,
      firstGo: true
      // user: {
      //   loggedIn: false
      // }
    }
  }

  onSetCreation(cards_ary) {
    new_deck = this.state.deck.filter(deck_card =>  !cards_ary.includes(deck_card));

    this.setState({deck: new_deck})
  }

  componentWillMount() {
    $.ajax({
      url: '/cards'
    }).done(function(response) {
      this.setState({deck: response});
    }.bind(this));
    this.setState({gameStart: this.props.gameStart});
  }



  onCardClick(clickedCard, newStatus) {
    var newDeck = this.state.deck.filter(card => card.id != clickedCard.props.data.id );
    var cardToUpdate = this.state.deck.find(card => card.id == clickedCard.props.data.id );

    cardToUpdate.status = newStatus;
    newDeck.push(cardToUpdate);


    var selectedCards = hasSelectedSet(newDeck);
    if (selectedCards) {
      if (validSet(selectedCards)) {
        var newestDeck = newDeck.filter(card => card.status != "selected" );

        this.setState({deck: newestDeck});
        alert("Dawg, you so smart!");

      } else {
        alert("That's not a valid set, dawg.");
        newDeck.forEach(function(card) { if (card.status=="selected") { card.status = "onBoard"; }});
        this.setState({deck: newDeck});
      }
    } else {
      this.setState({deck: newDeck, firstGo: false});
    }

  }


  startGame() {
    this.setState({gameStart: true});
    this.props.startTimer();
  }

  render() {

    if (this.state.gameStart) {
      return(
        <div>
          <Nav />
          <Game deck={this.state.deck} uponClick={this.onCardClick} firstGo={this.state.firstGo}/>

        </div>
      )
    } else {
      return(
        <div>
          <Nav />
          <div className="start">
            <input className="startButton animate red-button" type="button" value="Start Game" onClick={this.startGame} />
          </div>
          <Instructions />

        </div>
      )
    }

  }

}
