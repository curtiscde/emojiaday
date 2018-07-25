import Entry from '../models/entry';

export default class entryHelper {

  static getEntryByDateUser(date, userid) {
    return new Promise((resolve, reject) => {
      Entry.find({
        userid: userid,
        date: date
      }, (err, emoji) => {
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