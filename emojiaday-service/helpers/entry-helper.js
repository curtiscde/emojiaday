import Entry from '../models/entry';

export default class entryHelper {

  static getEntryByDateUser(date, userid) {
    return new Promise((resolve, reject) => {
      Entry.find({
        userid: userid,
        date: date
      }, (err, entries) => {
        if (err){
          reject(err);
        }
        else {
          resolve(entries);
        }
      });
    });
  };

  static getEntriesByUser(userid){
    return new Promise((resolve, reject) => {
      Entry.find({
        userid: userid
      }, (err, entries) => {
        if (err){
          reject(err);
        }
        else {
          resolve(entries);
        }
      });
    });
  }

}