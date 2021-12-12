const mestoAPIConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-4",
    headers: {
        authorization: "04240b89-439a-4206-bc6f-4dcd1c8db2b2",
        "Content-Type": "application/json;charset=utf-8",
    },
};

const requestResult = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(
            `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
        );
    }
};

const getUserInfo = () => {
    return fetch(`${mestoAPIConfig.baseUrl}/users/me`, {
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

const getCardsInfo = () => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards`, {
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

const deleteCardsAPI = (card_id) => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards/${card_id}`, {
        method: "DELETE",
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

const putLikesAPI = (card_id) => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards/likes/${card_id}`, {
        method: "PUT",
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

const deleteLikesAPI = (card_id) => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards/likes/${card_id}`, {
        method: "DELETE",
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

const addNewCadrsAPI = (mestoName, linkFotoMesto) => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards`, {
        method: "POST",
        headers: mestoAPIConfig.headers,
        body: JSON.stringify({
            name: `${mestoName}`,
            link: `${linkFotoMesto}`,
        }),
    }).then((res) => requestResult(res));
};

const changeAvatarAPI = (avatarLink) => {
    return fetch(`${mestoAPIConfig.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: mestoAPIConfig.headers,
        body: JSON.stringify({
            avatar: `${avatarLink}`,
        }),
    }).then((res) => requestResult(res));
};

function sendProfileDataToServer(description, Avtor) {
    return fetch(`${mestoAPIConfig.baseUrl}/users/me`, {
        method: "PATCH",
        headers: mestoAPIConfig.headers,
        body: JSON.stringify({
            about: `${description}`,
            name: `${Avtor}`,
        }),
    }).then((res) => requestResult(res));
}

const checkLikesAPI = (data) => {
    return fetch(`${mestoAPIConfig.baseUrl}/cards/${data}`, {
        headers: mestoAPIConfig.headers,
    }).then((res) => requestResult(res));
};

export {
    getCardsInfo,
    deleteCardsAPI,
    putLikesAPI,
    deleteLikesAPI,
    changeAvatarAPI,
    addNewCadrsAPI,
    sendProfileDataToServer,
    checkLikesAPI,
    getUserInfo,
    requestResult,
};
