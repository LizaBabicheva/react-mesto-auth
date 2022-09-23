import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Redirect, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState({});

  //
  const [loggedIn, setLoggedIn] = useState(false);
  function handleLogin() {
    setLoggedIn(true);
  }

  const history = useHistory();
  useEffect(() => {
    tokenCheck()
  },[])

  const [userData, setUserData] = useState({ email: '' });
  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        auth.getToken(token)
          .then((res) => {
            if (res) {
              setUserData({ email: res.data.email });
              handleLogin();
              history.push('/');
            }
          })
      }
    }
  }

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

const [isRegistered, setIsRegistered] = useState(false);

function handleRegistered() {
  setIsRegistered(true);
}

  function handleRegister(data) {
    auth.signup(data.email, data.password)
      .then((res) => {
        if (res) {
            handleRegistered();
            handleInfoTooltip();
          history.push('/sign-in');
        } else {
          handleInfoTooltip();
        }
      });

  }


  //


  useEffect((userData) => {
    api.getApiUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect((cardData) => {
    api.getInitialCards(cardData)
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

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
    setSelectedCard(card);
  }

  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsConfirmDeletePopupOpen(false);
    //
    setIsInfoTooltipOpen(false);
    //
  }

  function handleUpdateUser(userData) {
    api.setApiUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(userData) {
    api.changeAvatarApi(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeApi(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete() {
    api.deleteCardApi(cardDelete._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== cardDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCardApi(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">

        <Header
          email={userData.email}
        loggedIn={loggedIn}
        />

        <Switch>
          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
            />
          </Route>

          <Route path="/sign-up">
            <Register 
            onRegister={handleRegister} 
            />
          </Route>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDeleteClick}
            cards={cards}
          />

          {/* <Route path="*">
            {loggedIn ? console.log('aaaa') : console.log('bbbbb')}
          </Route> */}
          {/* <Route exact path="/">
            {!loggedIn ? <Redirect to="/sign-in" /> : 
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
              cards={cards} />
            }
          </Route> */}

        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard} />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete} />

          <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} 
          isRegistered={isRegistered}/>

      </div>

    </CurrentUserContext.Provider>
  )
}

export default App;