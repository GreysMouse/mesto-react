import React from 'react';
import Card from './Card'; 

import api from '../utils/api';
import avatarPath from '../images/image-empty.png';

function Main(props) {
  const [userId, setUserId] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState(avatarPath);
  const [userName, setUserName] = React.useState('Имя');
  const [userDescription , setUserDescription] = React.useState('О себе');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(data => {
      const [user, cards] = data;

      setUserId(user._id);
      setUserAvatar(user.avatar);
      setUserName(user.name);
      setUserDescription(user.about);
    
      setCards(cards);
    
      console.log('Данные профиля и карточки получены!');
    }).catch(err => {
      console.log(`${err}. Не удалось получить данные о профиле и карточки с сервера.`);
    });

    return () => {
      setUserAvatar(avatarPath);
      setUserName('Имя');
      setUserDescription('О себе');
    
      setCards([]);
    };
  }, []);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile} />
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace} />
      </section>
      <section className="cards" aria-label="Карточки мест">
        <ul className="cards__container">
          {
            cards.map((card) => (
              <li key={card._id}>
                <Card card={card} viewer={userId} onCardClick={props.onOpenCard}/>
              </li>
            ))
          };
        </ul>
      </section>
    </main>
  );
}

export default Main;