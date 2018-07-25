import moment from 'moment';
import Entry from '../models/entry';
import entryHelper from '../helpers/entry-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entry/day', (req, res) => {
        console.log('GET entry');
        res.json();
    });

    apiRoutes.post('/entry/day', (req, res) => {
        console.log('📩 POST entry day', req.params.day);

        const userid = '124';
        const date = moment(req.body.date).toDate();
        const emoji = req.body.emoji;
        
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


        
    });

    console.log('😄 entry routes loaded');
};