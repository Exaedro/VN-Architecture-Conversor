const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Von Neumann Converter' });
})

module.exports = router;
