import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entries/day/:day', authHelper.jwtCheck, (req, res) => {
        
        entryHelper.getEntriesByDateUser(req.user.sub).then(entries => {

            const userEntries = entries.map(entry => ({
                date: entry.date,
                emoji: entry.emoji
            }));



            res.json({
                userEntries
            });
        });
        
    });

    console.log('😄 entries day routes loaded');
};
