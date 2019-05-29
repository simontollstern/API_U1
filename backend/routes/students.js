const Student = require('../models/student.js');

const get = (req, res) => {
  if(req.query.name){
    dbQuery = Student.findOne({ 'name': req.query.name });
  }else{
    dbQuery = Student.find();
  }
  dbQuery.exec().then(students => res.send(students));
}

const post = (req, res) => {
  Student.create({
    name: req.body.name,
    email: req.body.email,
    address: {
      street: req.body.address.street,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city
    }
  }).then(student => res.status(201).send(student));
}

const getById = (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (err) return console.log(err);
    res.send(student);
  })
}

const put = (req, res) => {
  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    address: {
      street: req.body.address.street,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city
    }}, { upsert: true }
  ).then(student => res.status(201).send(student));
}

const deleteById = (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err, student) => {
    if (err) return console.log(err);
    res.send(student);
  });
}

module.exports = {
  get,
  post,
  getById,
  put,
  deleteById
};
