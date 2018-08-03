import Entry from '../models/entry';
import moment from 'moment';

export default class entryHelper {

  static getEntriesByDateUser(date, userid) {
    
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');
    
    return this.getEntries({
      userid: userid,
      date: {
        $gte: startOfDay.toDate(),
        $lt: endOfDay.toDate()
      }
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