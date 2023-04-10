class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handelResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(res.json())
  }

  authorization(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(this._handelResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
    })
      .catch((err) => Promise.reject(`Ошибка: ${err.status}`));
  }

  registration(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._handelResponse);
  }

  getChats() {
    return fetch(`${this._baseUrl}/chats`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._handelResponse);
  }

  getMessages(chatID) {
    return fetch(`${this._baseUrl}/messages/${chatID}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._handelResponse);
  }

  addMessage(chatID, data) {
    return fetch(`${this._baseUrl}/messages/${chatID}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(this._handelResponse);
  }

  createChat(data) {
    return fetch(`${this._baseUrl}/chats`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(this._handelResponse);
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
});
