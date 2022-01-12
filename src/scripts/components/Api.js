export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  //check status request
  _requestResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  };

  //get user data
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  //get cardsData to load to the page
  getCardsInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  //delete card from server
  deleteCardsAPI = (card_id) => {
    return fetch(`${this._baseUrl}/cards/${card_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  //put like
  putLikesAPI = (card_id) => {
    return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  //remove like
  deleteLikesAPI = (card_id) => {
    return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  };

  //add card to the page
  addNewCadrsAPI = (mestoName, linkFotoMesto) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${mestoName}`,
        link: `${linkFotoMesto}`,
      }),
    }).then((res) => this._requestResult(res));
  };

  //put another avatar image to server
  changeAvatarAPI = (avatarLink) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    }).then((res) => this._requestResult(res));
  };

  //put another name to server
  sendProfileDataToServer(description, Avtor) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        about: `${description}`,
        name: `${Avtor}`,
      }),
    }).then((res) => this._requestResult(res));
  }

  //check if card has been liked by my self
  checkLikesAPI(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}
