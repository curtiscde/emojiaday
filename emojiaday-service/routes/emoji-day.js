const moment = require('moment');
const Emoji = require('../models/emoji');

module.exports = (apiRoutes) => {

    apiRoutes.get('/emoji/day', (req, res) => {
        console.log('GET emoji');
        res.json();
    });

    apiRoutes.post('/emoji/day', (req, res) => {
        console.log('POST emoji day', req.params.day);

        console.log(req.body);

        const date = moment(req.body.date).toDate();
        const emoji = req.body.emoji;

        Emoji.create({
            userid: '123',
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
    });

    console.log('😄 emoji-day routes loaded');
};