import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'; 

import api from '../utils/api';
import emptyCardPath from '../images/image-empty.png';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({}); 

  const emptyCard ={
    name: 'Название места',
    link: emptyCardPath
  };

  const [cards, setCards] = React.useState([]);
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(emptyCard);

  React.useEffect(() => {
    api.getInitialCards().then(cards => {  
      setCards(cards);
    
      console.log('Карточки получены!');
    }).catch(err => {
      console.log(`${err}. Не удалось получить карточки с сервера.`);
    });

    return () => setCards([]);
  }, []);

  React.useEffect(() => {
    api.getUserInfo().then(user => {
      setCurrentUser(user);

      console.log('Данные профиля получены!');
    }).catch(err => {
      console.log(`${err}. Не удалось получить данные о профиле с сервера.`);
    });

    return () => {
      setCurrentUser({});
    };
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(liked => liked._id === currentUser._id);

    if(isLiked) {
      api.uncheckLike(card._id).then(updatedCard => {
        setCards(cards.map(c => c._id === card._id ? updatedCard : c));
        console.log('Состояние лайка изменено!');
      }).catch(err => {
        console.log(`${err}. Не удалось изменить состояние лайка.`);
      });
    }
    else {
      api.checkLike(card._id).then(updatedCard => {
        setCards(cards.map(c => c._id === card._id ? updatedCard : c));
        console.log('Состояние лайка изменено!');
      }).catch(err => {
        console.log(`${err}. Не удалось изменить состояние лайка.`);
      });
    }
  }

  function handleCardClick(card) {
    setIsCardSelected(true);

    setSelectedCard({
      caption: card.name,
      link: card.link
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(message => {
      setCards(cards.filter(c => c._id !== card._id));
      console.log('Карточка успешно удалена!');
    }).catch(err => {
      console.log(`${err}. Не удалось удалить карточку с сервера.`);
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setIsCardSelected(false);
    setSelectedCard(emptyCard);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({name, description}) {
    api.updateProfile(name, description).then(updatedUser => {
      setCurrentUser(updatedUser);
      console.log('Профиль успешно обновлён!');
    }).catch(err => {
      console.log(`${err}. Не удалось обновить профиль.`);
    }).finally(() => {
      closeAllPopups();
    });
  }

  function handleUpdateAvatar({avatarLink}) {
    api.updateAvatar(avatarLink).then(updatedUser => {
      setCurrentUser(updatedUser);
      console.log('Аватар успешно обновлён!');
    }).catch(err => {
      console.log(`${err}. Не удалось обновить аватар.`);
    }).finally(() => {
      closeAllPopups();
    });  
  }

  function handleAddPlace({title, link}) {
    api.addCard(title, link).then(params => {
      setCards([params, ...cards]);
      console.log('Карточка успешно добавлена!');
    }).catch(err => {
      console.log(`${err}. Не удалось разместить карточку.`)
    }).finally(() => {
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onOpenCard={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          {/* <PopupWithForm mode="confirm" header="Вы уверены?" buttonText="Да" buttonAddClasses=" popup__button_type_comfirm" onClose={closeAllPopups} /> */}
          <ImagePopup card={selectedCard} isOpen={isCardSelected} onClose={closeAllPopups} />
        </div> 
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;