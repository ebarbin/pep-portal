import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogMessageService {

  constructor() { }

  getFixedMessage(rawMessage) {
    let message = null;

    message = rawMessage.split('Cannot read property')
      .join('No se puede leer la propiedad ')
      .split('of undefined')
      .join('de indefinido');

    if (message !== rawMessage) {
      return message;
    }

    message = rawMessage.split('is not defined')
      .join('no esta definido');

    if (message !== rawMessage) {
      return message;
    }

    message = rawMessage.split('Unexpected end of input')
      .join('Final de linea inesperado');

    if (message !== rawMessage) {
      return message;
    }

    message = rawMessage.split('Unexpected token')
    .join('Carácter inesperado');

    if (message !== rawMessage) {
      return message;
    }

    console.log(rawMessage);

    return rawMessage;
  }
}
