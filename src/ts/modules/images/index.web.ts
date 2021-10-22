/**
* index.web.ts
* Copyright: Microsoft 2018
*
* Web implementation of "images" module.
*/

import AppConfig from '../../app/AppConfig';

import { ImageSourceBase } from './Images';

class ImageSource implements ImageSourceBase {
    todoLogo = AppConfig.getImagePath('todo-logo.png');
    todoSmall = AppConfig.getImagePath('todo-small.png');
    hand = AppConfig.getImagePath('hand.png');
    moralis = AppConfig.getImagePath('moralis.png');
    metamask = AppConfig.getImagePath('metamask.png');
    colorsBack = AppConfig.getImagePath('colorsBack.png');
}

export default new ImageSource();
