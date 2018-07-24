module.exports = (apiRoutes) => {

    apiRoutes.get('/user', (req, res) => {

        console.log('👩‍💼 GET User');

        res.json({
            name: 'John Doe',
            dates: [
                {
                    date: '20180724',
                    emoji: 'smile'
                }
            ]
        });

    });

}