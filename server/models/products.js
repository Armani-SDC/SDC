const axios = require('axios');
const pool = require('../db/db.js');

module.exports = {

  get: function(id, cb) {

    var productQuery =  pool.query(`SELECT * FROM products where id = ${id}`);
    var featuresQuery = pool.query(`SELECT * FROM features where product_id = ${id}`);
   Promise.all([productQuery, featuresQuery])
    .then((res) => {
      var newData = res[0].rows[0];
      newData.features = res[1].rows;
      cb(null, newData);
    })
    .catch((err) => {
      console.log(err);
      cb(err, 'Noooo!');
    })
  },

  getList: function(page = 1, count = 5, cb) {

    pool.query(`SELECT * FROM products LIMIT ${count}`)
    .then((res) => {
      cb(null, res.rows);
    })
    .catch((err) => {
      console.log(err);
      cb(err, 'Noooo!');
    })
  },

  getStyles: function(id, cb) {

    pool.query(`SELECT id, name, sale_price, original_price, default_style FROM styles where productid = ${id}`)
    .then((res) => {

      var newData = {
        product_id: id
      };
      newData.results = res.rows;

      var photoPromise = [];
      var skusPromise = [];

      for (var i = 0; i < newData.results.length; i++) {
        photoPromise[i] = pool.query(`SELECT url, thumbnail_url FROM photos where styleId = ${newData.results[i].id}`);
        skusPromise[i] = pool.query(`SELECT id, size, quantity FROM skus where styleId = ${newData.results[i].id}`);
      }

      Promise.all(photoPromise)
      .then((res) => {
        for (var i = 0; i < newData.results.length; i++) {
          newData.results[i].photos = res[i].rows;
        }

        Promise.all(skusPromise)
        .then((res) => {
          for (var i = 0; i < newData.results.length; i++) {
            newData.results[i].skus = res[i].rows;
          }
          //console.log(newData);
          cb(null, newData);
        })
        .catch((err) => {
          console.log(err);
          cb(err, 'Noooo!');
        })
      })
      .catch((err) => {
        console.log(err);
        cb(err, 'Noooo!');
      })
    })
    .catch((err) => {
      console.log(err);
      cb(err, 'Noooo!');
    })


  },

  getRelated: function (id, cb) {

    pool.query(`SELECT current_product_id FROM related where related_product_id = ${id}`)
    .then((res) => {
      var newData = [];
      for (var i = 0; i < res.rows.length; i++) {
        newData[i] = res.rows[i].current_product_id;
      }
      cb(null, newData);
    })
    .catch((err) => {
      console.log(err);
      cb(err, 'Noooo!');
    })
  }
};