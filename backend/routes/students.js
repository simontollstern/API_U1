const Student = require('../models/student.js');

const get = (req, res, next) => {
  let dbQuery;
  if(req.query.name){
    dbQuery = Student.findOne({ 'name': req.query.name });
  }else{
    dbQuery = Student.find();
  }
  dbQuery.exec()
    .then(students => res.send(students))
    .catch(error => next(error));
}

const getById = (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.send(student))
    .catch(error => next(error));
}

const post = (req, res, next) => {
  Student.create({
    name: req.body.name,
    email: req.body.email,
    address: {
      street: req.body.address.street,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city
    }
  }).then(student => res.status(201).send(student))
    .catch(error => next(error));
}

const put = (req, res, next) => {
  Student.updateOne({ _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      address: {
        street: req.body.address.street,
        zipCode: req.body.address.zipCode,
        city: req.body.address.city
      }
    },
    {
      new: true,
      upsert: true
    }
  ).then(status => {
    if(status.upserted){
      res.status(201);
    }else if(status.nModified){
      res.status(200);
    }else{
      res.status(204);
    }
    res.send();
  })
  .catch(error => next(error));
}

const deleteById = (req, res, next) => {
  Student.findByIdAndDelete(req.params.id)
    .then(deleted => {
      if (deleted) return res.status(200).send(deleted);
      res.sendStatus(204);
    })
    .catch(error => next(error));
}

module.exports = {
  get,
  post,
  getById,
  put,
  deleteById
};
