import Card from "./Cards";
import { cardsContainer } from "../utils/constants";

//* Класс размещения карточек на странице
export class Section {
    constructor(userId, cardsData, cardTemplate, deleteCardsPopup) {
        this.cardsData = cardsData;
        this._userId = userId;
        this._cardTemplate = cardTemplate;
        this._deleteCardsPopup = deleteCardsPopup;
    }

    //* Добавление карточки
    addItem(cardsData, userData, mainApiData, bigImages) {
        cardsData.reverse().forEach((dataObj) => {
            const card = new Card(dataObj.name, dataObj.link, dataObj.likes, dataObj.owner._id, dataObj._id, userData, mainApiData, bigImages, this._cardTemplate, this._deleteCardsPopup);

            const cardElement = card.cardGenerator();
            cardsContainer.prepend(cardElement);
        });
    }
}
