import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import emptyCardPath from '../images/image-empty.png';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);  

  const emptyCard ={
    name: 'Название места',
    link: emptyCardPath
  };

  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(emptyCard);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsCardSelected(true);

    setSelectedCard({
      caption: card.name,
      link: card.link
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setIsCardSelected(false);
    setSelectedCard(emptyCard);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onOpenCard={handleCardClick}/>
        <Footer />
        <PopupWithForm mode="avatar" header="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <form className="popup__form" noValidate>
            <input className="popup__input popup__input_content_avatar" id="avatar" type="url" placeholder="Ссылка на аватар" autoComplete="off" required />
            <span className="popup__input-error" id="avatar-error" />
            <button className="popup__button" type="submit">Сохранить</button>
          </form>
        </PopupWithForm>
        <PopupWithForm mode="edit" header="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <form className="popup__form" noValidate>
            <input className="popup__input popup__input_content_name" id="name" type="text" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
            <span className="popup__input-error" id="name-error" />
            <input className="popup__input popup__input_content_description" id="description" type="text" placeholder="О себе" minLength="2" maxLength="200" autoComplete="off" required />
            <span className="popup__input-error" id="description-error" />
            <button className="popup__button" type="submit">Сохранить</button>
          </form>
        </PopupWithForm>
        <PopupWithForm mode="add" header="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <form className="popup__form" noValidate>
            <input className="popup__input popup__input_content_title" id="title" type="text" placeholder="Название" minLength="2" maxLength="30" autoComplete="off" required />
            <span className="popup__input-error" id="title-error" />
            <input className="popup__input popup__input_content_link" id="link" type="url" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__input-error" id="link-error" />
            <button className="popup__button" type="submit">Создать</button>
          </form>
        </PopupWithForm>
        <PopupWithForm mode="confirm" header="Вы уверены?" onClose={closeAllPopups}>
          <button className="popup__button popup__button_type_comfirm" type="button">Да</button>
          <button className="popup__close-button" type="button" aria-label="Закрыть" />
        </PopupWithForm>
        <ImagePopup card={selectedCard} isOpen={isCardSelected} onClose={closeAllPopups}/>
      </div> 
    </div>
  );
}

export default App;