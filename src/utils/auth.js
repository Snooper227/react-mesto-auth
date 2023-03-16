class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
_checkRes(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Что-то пошло не так...: ${res.status}`);
}
register(email, password) {
  return fetch(`${this._baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(this._checkRes);
}
authorization(email, password) {
  return fetch(`${this._baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(this._checkRes);
}

chekTokenValid(token) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
    },
  })
  .then(this._checkRes);
}
}
const auth = new Auth('https://auth.nomoreparties.co');

export default auth;
