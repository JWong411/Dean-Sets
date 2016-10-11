class Game extends React.Component {

  constructor() {
    super();
    // this.onCardClick = this.onCardClick.bind(this);
  }
  // change card's status

  render() {
    let { deck } = this.props;
    return(
      <div className="board">
        <ul>
          {deck.map((card, i) =>
            <Card key={i} data={card} uponClick={this.props.uponClick}/>
          )}
        </ul>
      </div>
    )
  }
}
