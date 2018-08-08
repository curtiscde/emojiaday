const mongoose = require('mongoose');

module.exports = mongoose.model('Entry', {
    userid: String,
    emoji: String,
    date: Date,
    index: Number
});