export default class Card {
    constructor(data, userData, apiData, bigImagesPopup, cardTemplate, openDeletePopup) {
        this._cardTitle = data.name;
        this._cardImage = data.link;
        this._userId = userData;
        this._cardOwnerId = data.owner._id;
        this._likesArray = data.likes;
        this._cardId = data._id;
        this._cardsApi = apiData;
        this._cardBigImagePopup = bigImagesPopup;
        this._cardTemplate = cardTemplate;
        this._deletingPopup = openDeletePopup;
    }

    cardGenerator() {
        this._element = this._getTemplate();
        this._likeHeart = this._element.querySelector(".card__button-like");
        this._likeCount = this._element.querySelector(".card__number-of-likes");
        this._cardImageContainer = this._element.querySelector(".card__foto");
        this._bucket = this._element.querySelector("#deleteButton");
        this._cardImageContainer.src = `${this._cardImage}`;
        this._cardImageContainer.alt = `${this._cardTitle}`;
        this._element.querySelector(".card__title").textContent = `${this._cardTitle}`;
        this._cardImageContainer.alt = `${this._cardTitle}`;
        this._setEventListeners();
        this._deleteCardHandlerDeactivate();
        this._checkInitialLikes();

        return this._element;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }

    _deleteConfirmPopupHandler() {
        this._deletingPopup(this._cardId, this._element);
    }

    _setEventListeners() {
        this._likeHeart.addEventListener("click", () => {
            this._likeHandler();
        });
        this._cardImageContainer.addEventListener("click", () => {
            this._cardBigImagePopup(this._cardImage, this._cardTitle);
        });
        this._bucket.addEventListener("click", () => {
            this._deleteConfirmPopupHandler();
        });
    }

    _deleteCardHandlerDeactivate() {
        if (this._cardOwnerId !== this._userId) {
            this._bucket.remove(); //удаляем прям элемент корзинки
        }
    }

    _likeHandler() {
        if (!this._likeHeart.classList.contains("card__button-like_active")) {
            this._cardsApi
                .putLikesAPI(this._cardId)
                .then((res) => {
                    const numOfLikes = res.likes.length;
                    this._likeCount.textContent = numOfLikes;
                    this._likeHeart.classList.add("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._cardsApi
                .deleteLikesAPI(this._cardId)
                .then((res) => {
                    const numOfLikes = res.likes.length;
                    this._likeCount.textContent = numOfLikes;
                    this._likeHeart.classList.remove("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _checkInitialLikes() {
        if (this._likesArray !== 0) {
            this._likeCount.textContent = this._likesArray.length;
            this._likesArray.forEach((user) => {
                if (user._id === this._userId) {
                    this._likeHeart.classList.add("card__button-like_active");
                }
            });
        } else {
            this._likeCount.textContent = 0;
        }
    }
}
