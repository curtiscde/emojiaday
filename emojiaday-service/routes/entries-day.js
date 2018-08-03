import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';
import moment from 'moment';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entries/day/:day', authHelper.jwtCheck, (req, res) => {

        const date = moment(req.params.date).toDate();
        
        entryHelper.getEntriesByDateUser(date, req.user.sub).then(entries => {

            const userEntries = entries.map(entry => ({
                date: entry.date,
                emoji: entry.emoji
            }));

            entryHelper.getEntriesByTopDay(date).then(topEmojis => {

                
                res.json({
                    userEntries,
                    topEmojis
                });
            });

            
        });
        
    });

    console.log('😄 entries day routes loaded');
};
