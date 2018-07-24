const mongoose = require('mongoose');

module.exports = mongoose.model('Emoji', {
    userid: String,
    emoji: String,
    date: Date
});