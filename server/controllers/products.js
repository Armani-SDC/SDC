const models = require('../models');

module.exports = {
  get: function (req, res) {
    models.products.get(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.status(201).send(data);
      }
    });
  },
  getList: function (req, res) {
    models.products.getList(req.query.page, req.query.count, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.status(201).send(data);
      }
    });
  },
  getStyles: function (req, res) {
    models.products.getStyles(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.status(201).send(data);
      }
    });
  },

  getRelated: function (req, res) {
    models.products.getRelated(req.params.product_id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.status(201).send(data);
      }
    });
  }
};