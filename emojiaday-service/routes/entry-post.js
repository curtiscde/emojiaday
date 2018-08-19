import moment from 'moment';
import Entry from '../models/entry';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    const MAX_INDEX = 2;

    //Required Params
    // userid (req.user.sub)
    // date (int - YYYYMMDD)
    // index
    // emoji
    apiRoutes.post('/entry/day', authHelper.jwtCheck, (req, res) => {
        console.log('📩 POST entry day');

        if (!req.body.date || req.body.date.length !== 8){
            res.status(500).send('Missing or invalid date');
            return;
        }

        const userid = req.user.sub;
        const date = moment.utc(req.body.date).toDate();
        const dateNow = moment().toDate();
        const index = +req.body.index;
        const emoji = req.body.emoji;

        const hoursDifference = moment(date).diff(moment(dateNow), 'hours');
        
        if (hoursDifference > 48 || hoursDifference < -48) {
            res.status(500).send('Date falls outside of allowed period');
        }        
        else if (!emoji){
            res.status(500).send('Missing emoji data');
        }
        else if (index < 0 || index > MAX_INDEX){
            res.status(500).send('Invalid index');
        }
        else{

            const startOfDay = moment(date).startOf('day');
            const endOfDay = moment(date).endOf('day');

            Entry.find({
                $and: [
                    {
                        userid: userid,
                        date: {
                            $gte: startOfDay.toDate(),
                            $lt: endOfDay.toDate()
                        }
                    },
                    {
                        $or: [
                            { index: index },
                            { emoji: emoji }
                        ]
                    }
                ]
            }, (err, entry) => {

                if (err){
                    res.status(500).send('Error');
                }
                else if(entry.length){
                    res.status(500).send('Index or Emoji already exists');
                }
                else{
                    Entry.create({
                        userid: userid,
                        date: date,
                        lastUpdated: dateNow,
                        index: index,
                        emoji: emoji,
                    }, (e, newEntry) => {    
                        res.json(newEntry);
                    });

                }

            });

        }
        
        
    });

    console.log('😄 entry post routes loaded');
};