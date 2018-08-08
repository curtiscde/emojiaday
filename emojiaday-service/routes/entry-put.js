import moment from 'moment';
import Entry from '../models/entry';
import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';
import { rejects } from 'assert';

module.exports = (apiRoutes) => {

    //Required Params
    // userid (req.user.sub)
    // entryid
    // emoji
    apiRoutes.put('/entry/day', authHelper.jwtCheck, (req, res) => {
        console.log('📩 POST entry day');

        const userid = req.user.sub;
        const entryid = req.body.entryid;
        const emoji = req.body.emoji;
        const date = moment().toDate();
        
        if (!emoji){
            res.status(500).send('Missing emoji data');
        }
        else if (!entryid){
            res.status(500).send('Missing entryid');
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
                            { emoji: emoji }
                        ]
                    }
                ]
            }, (err, entry) => {

                if (err){
                    res.status(500).send('Error');
                }
                else if(entry.length){
                    res.status(500).send('Emoji already exists');
                }
                else{

                  Entry.findById(entryid, (err, updateEntry) => {

                    updateEntry.emoji = emoji;
                    updateEntry.save();

                    res.json(updateEntry);

                  });

                }

            });

        }
        
        
    });

    console.log('😄 entry put routes loaded');
};