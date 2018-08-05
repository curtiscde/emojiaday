import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';
import moment from 'moment';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entries/day/:day', authHelper.jwtCheck, (req, res) => {

        const day = moment(req.params.day).toDate();
        
        entryHelper.getEntriesByDateUser(day, req.user.sub).then(entries => {

            const userEntries = entries.map(entry => ({
                date: entry.date,
                emoji: entry.emoji
            }));

            entryHelper.getEntriesByTopDay(day).then(topEmojis => {
                
                res.json({
                    userEntries,
                    topEmojis
                });
            });

            
        });
        
    });

    console.log('😄 entries day routes loaded');
};
