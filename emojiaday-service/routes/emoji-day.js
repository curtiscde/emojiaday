import moment from 'moment';
import Emoji from '../models/emoji';
import emojiHelper from '../helpers/emoji-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/emoji/day', (req, res) => {
        console.log('GET emoji');
        res.json();
    });

    apiRoutes.post('/emoji/day', (req, res) => {
        console.log('POST emoji day', req.params.day);

        const userid = '124';
        const date = moment(req.body.date).toDate();
        const emoji = req.body.emoji;
        
        emojiHelper.getEmojiDayUser(date, userid).then(data => {

            if (data.length){
                res.status(500).send(`Entry already exists for ${userid} on ${date}`);
            }
            else{
                Emoji.create({
                    userid: userid,
                    emoji: emoji,
                    date: date
                }, (err, emoji) => {
                    if (err) {
                        res.send(err);
                    }
                    else{
                        res.json(emoji);
                    }
                });
            }

        });


        
    });

    console.log('😄 emoji-day routes loaded');
};