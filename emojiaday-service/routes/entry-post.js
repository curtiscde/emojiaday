import moment from 'moment';
import Entry from '../models/entry';
import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';
import { rejects } from 'assert';

module.exports = (apiRoutes) => {

    const MAX_INDEX = 2;

    //Required Params
    // userid (req.user.sub)
    // index
    // emoji
    apiRoutes.post('/entry/day', authHelper.jwtCheck, (req, res) => {
        console.log('📩 POST entry day');

        const userid = req.user.sub;
        const date = moment().toDate();
        const index = +req.body.index;
        const emoji = req.body.emoji;
        

        if (!emoji){
            res.status(500).send('Missing emoji data');
        }
        else if (!date){
            res.status(500).send('Missing date data');
        }
        else if (!index){
            res.status(500).send('Missing index data');
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
                console.log('entry', entry);

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
                        index: index,
                        emoji: emoji,
                    }, (e, newEntry) => {
                        console.log('newEntry', newEntry);
    
                        res.json(newEntry);
                    });

                }

            });

            // Entry.findOneAndUpdate({
            //     userid: userid,
            //     date: {
            //         $gte: startOfDay.toDate(),
            //         $lt: endOfDay.toDate()
            //     }
            // }, {
            //     userid: userid,
            //     emoji: emoji,
            //     date: date
            // }, {
            //     new: true,
            //     upsert: true
            // }, (err, entry) => {
            //     if (err) {
            //         res.status(500).send(err);
            //     }
            //     else{
            //         res.json(entry);
            //     }
            // });

        }
        
        
    });

    console.log('😄 entry post routes loaded');
};