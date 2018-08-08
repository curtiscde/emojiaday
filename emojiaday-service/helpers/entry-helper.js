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

  static getEntryByDateUserIndex(date, userid, index) {
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');

    return this.getEntries({
      userid: userid,
      date: {
        $gte: startOfDay.toDate(),
        $lt: endOfDay.toDate()
      },
      index: index
    });
  }

  static getEntriesByUser(userid){
    return this.getEntries({
      userid: userid
    });
  }

  static getEntriesByTopDay(date){
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');

    return new Promise((resolve, reject) => {

      const aggregatorOpts = [
        {
          $match: {
            date: {
              $gte: startOfDay.toDate(),
              $lt: endOfDay.toDate()
            }
          },
        },
        {
          $group: {
              _id: "$emoji",
              count: { $sum: 1 }
          }
        },
        { $sort   : { count : -1 } },
        { $limit  : 3 }
      ];

      Entry.aggregate(aggregatorOpts).exec((err, entries) => {
        if (err){
          reject(err);
        }
        else {
          resolve(entries);
        }
      });
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