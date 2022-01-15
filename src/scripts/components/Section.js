import Card from "./Cards";
import { cardsContainer } from "../utils/constants";

//* Класс размещения карточек на странице
export class Section {
    constructor(cardsData, userId) {
        this.cardsData = cardsData;
        this.userId = userId;
    }

    //* Добавление карточки
    addItem(cardsData) {
        cardsData.forEach((dataObj) => {
            const card = new Card(dataObj.name, dataObj.link, dataObj.likes, dataObj.owner._id, this.userId);
            const cardElement = card.cardGenerator();
            cardsContainer.append(cardElement);
        });
    }
}
