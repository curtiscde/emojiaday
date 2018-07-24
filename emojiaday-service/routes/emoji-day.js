const moment = require('moment');
const Emoji = require('../models/emoji');

module.exports = (apiRoutes) => {

    apiRoutes.get('/emoji/day/:day', (req, res) => {
        console.log('GET emoji');
        res.json();
    });

    apiRoutes.post('/emoji/day/:day', (req, res) => {
        console.log('POST emoji day', req.params.day);

        const date = moment(req.params.day).toDate();
        console.log('data', date);

        Emoji.create({
            userid: '123',
            emoji: 'smile',
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