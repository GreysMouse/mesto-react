import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) { 
  const inputRef = React.useRef();

  const [isValidLink, setIsValidLink] = React.useState(false);
  const [linkValdationMessage, setLinkValdationMessage] = React.useState('');

  const [isButtonHidden, setIsButtonHidden] = React.useState(true);

  React.useEffect(() => {
    inputRef.current.value = '';

    setIsValidLink(true);
    setLinkValdationMessage('');

    setIsButtonHidden(true);
  }, [props.isOpen]);

  function handleLinkInput(evt) {
    if(evt.target.validity.valid) {
      setIsValidLink(true);
      setLinkValdationMessage('');
      setIsButtonHidden(false);
    }
    else {
      setIsValidLink(false);
      setLinkValdationMessage(inputRef.current.validationMessage);
      setIsButtonHidden(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatarLink: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      mode="avatar"
      header="Обновить аватар"
      buttonText="Сохранить"
      buttonAddClasses=""
      isButtonHidden={isButtonHidden}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_avatar"
        id="avatar"
        type="url"
        ref={inputRef}
        onChange={handleLinkInput}
        placeholder="Ссылка на аватар"
        autoComplete="off"
        required
      />
      <span
        className={`popup__input-error${isValidLink ? '' : ' popup__input-error_visible'}`}
      >
        {linkValdationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;