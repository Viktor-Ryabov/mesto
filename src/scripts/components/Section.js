import Card from "./Cards";
import { cardsContainer } from "../utils/constants";

//* Класс размещения карточек на странице
export class Section {
    constructor(userId, cardsData, cardTemplate) {
        this.cardsData = cardsData;
        this._userId = userId;
        this._cardTemplate = cardTemplate;
    }

    //* Добавление карточки
    addItem(cardsData, userData, apiRyabov, bigImages, popupDeleteConfirming) {
        cardsData.reverse().forEach((dataObj) => {
            const card = new Card(dataObj.name, dataObj.link, dataObj.likes, dataObj.owner._id, dataObj._id, userData, apiRyabov, bigImages, this._cardTemplate, popupDeleteConfirming);
            const cardElement = card.cardGenerator();
            cardsContainer.prepend(cardElement);
        });
    }
}
