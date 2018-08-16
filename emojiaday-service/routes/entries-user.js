import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entries/user', authHelper.jwtCheck, (req, res) => {
        
        entryHelper.getEntriesByUser(req.user.sub).then(entries => {
            res.json(entries.map(entry => ({
                date: entry.date,
                emoji: entry.emoji,
                entryid: entry._id,
                index: entry.index,
            })));
        });
        
    });

    console.log('😄 entries user routes loaded');
};