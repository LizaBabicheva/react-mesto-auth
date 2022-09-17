import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const placeNameRef = useRef();
  const placeLinkRef = useRef();

  useEffect(() => {
    if (isOpen) {
      placeNameRef.current.value = ''
      placeLinkRef.current.value = ''
    }
  }, [placeNameRef, placeLinkRef, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle="Создать"
      onSubmit={handleSubmit}
    >

      <label className="popup__input-label">
        <input className="popup__input popup__input_type_placename" type="text" placeholder="Название" name="element-name" minLength="2" maxLength="30" required
          ref={placeNameRef} />
        <span className="popup__error"></span>
      </label>
      <label className="popup__input-label">
        <input className="popup__input popup__input_type_placephoto" type="url" placeholder="Ссылка на картинку" name="element-image" required
          ref={placeLinkRef} />
        <span className="popup__error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;