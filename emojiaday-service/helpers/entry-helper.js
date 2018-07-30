import Entry from '../models/entry';

export default class entryHelper {

  static getEntryByDateUser(date, userid) {
    return this.getEntries({
      userid: userid,
      date: date
    });
  };

  static getEntriesByUser(userid){
    return this.getEntries({
      userid: userid
    });
  }

  static getEntries(searchObj){
    return new Promise((resolve, reject) => {
      Entry.find(searchObj, (err, entries) => {
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