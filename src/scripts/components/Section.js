import Card from "./Cards";
import { cardsContainer } from "../utils/constants";

//* Класс размещения карточек на странице
export class Section {
    constructor(userId, cardsData) {
        this.cardsData = cardsData;
        this._userId = userId;
    }

    //* Добавление карточки
    addItem(cardsData, userData, apiRyabov, bigImages) {
        cardsData.reverse().forEach((dataObj) => {
            const card = new Card(dataObj.name, dataObj.link, dataObj.likes, dataObj.owner._id, dataObj._id, userData, apiRyabov, bigImages);
            const cardElement = card.cardGenerator();
            cardsContainer.prepend(cardElement);
        });
    }
}
