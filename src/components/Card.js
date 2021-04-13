function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div>
          <button className="card__like-button" type="button" aria-label="Нравится" />
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className={`card__delete-button${props.viewer === props.card.owner._id ? '' : ' card__delete-button_hidden'}`} type="button" aria-label="Удалить" />
    </div>
  );
}

export default Card;