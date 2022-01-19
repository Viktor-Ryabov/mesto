import Card from "./Cards";
import { cardsContainer } from "../utils/constants";

//* Класс размещения карточек на странице
export class Section {
  // constructor(userId, cardsData, cardTemplate, deleteCardsPopup) {
  //   this.cardsData = cardsData;
  //   this._userId = userId;
  //   this._cardTemplate = cardTemplate;
  //   this._deleteCardsPopup = deleteCardsPopup;
  // }

  // //* Добавление карточки
  // renderer(cardsData, userData, mainApiData, bigImages) {
  //   cardsData.reverse().forEach((dataObj) => {
  //     const card = new Card(
  //       dataObj.name,
  //       dataObj.link,
  //       dataObj.likes,
  //       dataObj.owner._id,
  //       dataObj._id,
  //       userData,
  //       mainApiData,
  //       bigImages,
  //       this._cardTemplate,
  //       this._deleteCardsPopup
  //     );

  //     const cardElement = card.cardGenerator();
  //     cardsContainer.prepend(cardElement);
  //   });
  // }
}

//_____________________________________

export class SectionQ {
  constructor({renderItems}, cardTemplate) {
    this._renderer = renderItems;    
    this._cardTemplate = cardTemplate;
  }

  renderItems(items){
    // console.log(items)
    items.forEach((item) => {
      // console.log(item)
      this._renderer(item);
      // console.log(item)
    })
  }

  addItem(item) {
    // const card = this._renderer(item)
    // console.log(card)
    this._cardTemplate.prepend(item);
  }
}
