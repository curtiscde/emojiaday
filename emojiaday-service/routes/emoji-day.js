module.exports = (apiRoutes) => {

    apiRoutes.get('/emoji/day/:day', (req, res) => {
        console.log('GET emoji');
        res.json();
    });

    apiRoutes.post('/emoji/day/:day', (req, res) => {
        console.log('POST emoji day', req.params.day);
        res.json(req.params.day);
    });

};