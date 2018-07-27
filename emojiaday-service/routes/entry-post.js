import moment from 'moment';
import Entry from '../models/entry';
import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    apiRoutes.post('/entry/day', authHelper.jwtCheck, (req, res) => {
        console.log('📩 POST entry day');

        const userid = req.user.sub;
        const date = moment().toDate();
        const emoji = req.body.emoji;

        if (!emoji){
            res.status(500).send('Missing emoji data');
        }
        else{
       
            entryHelper.getEntryByDateUser(date, userid).then(data => {
    
                if (data.length){
                    res.status(500).send(`Entry already exists for ${userid} on ${date}`);
                }
                else{
                    Entry.create({
                        userid: userid,
                        emoji: emoji,
                        date: date
                    }, (err, emoji) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else{
                            res.json(emoji);
                        }
                    });
                }
    
            });

        }
        
        
    });

    console.log('😄 entry post routes loaded');
};