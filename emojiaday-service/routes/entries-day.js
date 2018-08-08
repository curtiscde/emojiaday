import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';
import moment from 'moment';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entry/user/:day/:index', authHelper.jwtCheck, (req, res) => {

        const day = moment(req.params.day).toDate();
        const index = req.params.index;

        entryHelper.getEntryByDateUserIndex(day, req.user.sub, index).then(data => {
            if(!data.length){
                res.status(400);
            }
            else{
                res.json(data[0]);
            }
        });

    });

    apiRoutes.get('/entries/day/:day', authHelper.jwtCheck, (req, res) => {

        const day = moment(req.params.day).toDate();
    
        entryHelper.getEntriesByTopDay(day).then(topEmojis => {
            
            res.json({
                userEntries,
                topEmojis
            });
        });
        
    });

    console.log('😄 entries day routes loaded');
};
