import Emoji from '../models/emoji';
import { resolve } from 'dns';

export default class emojiHelper {

  static getEmojiDayUser(date, userid) {
    return new Promise((resolve, reject) => {
      Emoji.find({
        userid: userid,
        date: date
      }, (err, emoji) => {
        console.log('sdsd');
        if (err){
          reject(err);
        }
        else {
          resolve(emoji);
        }
      });
    });
  };

}