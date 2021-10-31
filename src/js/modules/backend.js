'use strict'
const SERVER_URL = 'https://morfey216.github.io/online-store-bd/bd.json';

const onError = errorMessage => errorMessage;

const onLoad = dataServer => dataServer.products;

export const getResponse = async () => {
    return await fetch(SERVER_URL)
      .then(response => response.json())
      .then(data => {
        return onLoad(data)
      })
      .catch(err => onError(err))
  }