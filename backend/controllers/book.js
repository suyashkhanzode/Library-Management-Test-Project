
const Book = require('../models/book');

exports.addBook = (req,res,next) =>{
    const name = req.body.name;
    const taken_on = req.body.taken_on;
    const return_date = req.body.return_date;
    Book.create({
        name : name,
        taken_on : taken_on,
        return_date : return_date
    })
    .then((result) =>{
        res.status(201).json({message : result})
    })
    .catch((err) =>{
        res.json({message : err})
    })
}

exports.getBooks = (req,res,next) =>{
     Book.findAll()
     .then((result) =>{
        res.status(201).json(result)
    })
    .catch((err) =>{
        res.json({message : err})
    })

};

exports.returnBook = (req,res,next) =>{
    const id = req.params.id;
    Book.update({
        return_status : true
    },{
        where :{
            id : id
        }
    })
    .then((result) =>{
        res.status(201).json({message : result})
    })
    .catch((err) =>{
        res.json({message : err})
    })

}
