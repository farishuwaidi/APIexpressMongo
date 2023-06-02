const { ObjectId } = require('mongodb');
const db = require('../config/mongodb');

const productController = {
  getAllProductWithQuery: (req, res) => {
    const name = req.query.name || '';

    db.collection('product')
      .find({ name: { $regex: name, $options: 'i' } })
      .toArray()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },

  getDetailProduct: (req, res) => {
    const { id } = req.params;
    db.collection('product')
      .findOne({ _id: ObjectId(id) })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  },

  CreateProduct: (req, res) => {
    const { name, stock, price, status } = req.body;
    db.collection('product')
      .insertOne({ name, stock, price, status })
      .then((result) =>
        res.send({
          message: 'berhasil menambah data',
          result,
        })
      )
      .catch((error) => res.send(error));
  },

  UpdateProduct: (req, res) => {
    const { id } = req.params;
    const { name, stock, price, status } = req.body;
    db.collection('product')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, stock, price, status } })
      .then((result) =>
        res.send({
          message: 'berhasil update data',
          result,
        })
      )
      .catch((error) => res.send(error));
  },

  DeleteProduct: (req, res) => {
    const { id } = req.params;
    db.collection('product')
      .deleteOne({ _id: ObjectId(id) })
      .then((result) =>
        res.send({
          message: 'berhasil menghapus data',
          result,
        })
      )
      .catch((error) => res.send(error));
  },
};

module.exports = productController;
