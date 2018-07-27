import entryHelper from '../helpers/entry-helper';
import authHelper from '../helpers/auth-helper';

module.exports = (apiRoutes) => {

    apiRoutes.get('/entries/user', authHelper.jwtCheck, (req, res) => {
        
        entryHelper.getEntriesByUser(req.user.sub).then(data => {
            res.json(data);
        });
        
    });

    console.log('😄 entries user routes loaded');
};