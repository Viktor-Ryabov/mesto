//* Класс с пользовательскими данными
export default class UserInfo {
    constructor({ profileName, profileDescription, profileId, profileAvatar }) {
        this._name = profileName;
        this._description = profileDescription;
        this._profileId = profileId;
        this._profileAvatar = profileAvatar;
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            description: this._description.textContent,
            id: this._profileId,
        };
        return userInfo;
    }

    setUserAvatar(data) {
        this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._description.textContent = userInfo.about;
        this.setUserAvatar(userInfo);
        // this._avatar.alt = `${userInfo.name} avatar`;
    }
}
