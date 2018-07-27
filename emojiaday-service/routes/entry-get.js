import moment from 'moment';
import Entry from '../models/entry';
import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entry/day', authHelper.jwtCheck, (req, res) => {
        console.log('GET entry');
        res.json();
    });

    console.log('😄 entry get routes loaded');
};