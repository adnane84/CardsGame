const Card = (props) => {
  return (
    <div className="card-face">
      <img
        src={`${
          props.isHeld ? "assets/filpSide.png" : `assets/${props.value}.png`
        }`}
        onClick={props.flipCard}
        alt=""
      ></img>
    </div>
  );
};

export default Card;
