const router = require('express').Router();
const controllers = require('./controllers');


/// Example route
// router.get('/product/:product_id, contoller.product.get);

/// Should return "Hello you found me"
/// When making a get request to Http://localhost:3000/sayhi

router.get('/products/:product_id', controllers.products.get);

router.get('/products', controllers.products.getList);

router.get('/products/:product_id/styles', controllers.products.getStyles);

router.get('/products/:product_id/related', controllers.products.getRelated);

module.exports = router;