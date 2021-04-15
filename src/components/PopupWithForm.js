function PopupWithForm(props) {
  return (
    <div className={`popup popup_mode_${props.mode}${props.isOpen ? " popup_opened" : ""}`} hidden={true}>
      <div className="popup__container">
        <h2 className="popup__header">{props.header}</h2>
          <form className="popup__form" noValidate>
            {props.children}
            <button className={`popup__button${props.buttonAddClasses}`} type="submit">{props.buttonText}</button>
          </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;