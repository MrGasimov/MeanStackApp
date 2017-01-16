var Model = require('./models/models.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//var db = "process.env.MONGODB_URI";

mongoose.connect(process.env.MONGODB_URI, function(err, db){
	if(err){
		console.log("failed to connect to database");
	}else{
		console.log('Connected to '+ db);
	}
});

var router = express.Router();


//get
router.get('/users', function(req,res){
  Model.find({}, function(err, users) {
    if(err){
      res.status(404).send(err);
    }else{
      res.status(200).send(users);

    }
  });
});

//post
router.post('/users',function(req,res){
	var model = new Model();
	model.name = req.body.name;
	model.age = req.body.age;
	model.save(function(err,user){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(user);
		}
	});
});

//delete
router.delete('/users/:id', function(req,res){
	console.log(req.params.id);
	var id = req.params.id;
	Model.remove({_id:id}, function(err,response){
		if(err){
			res.status(500).send(err);
		} else{
			res.status(200).send({message:"success on deleting user"});
		}
	});
});

//updateUser
router.put('/users',function(req,res){
	Model.findById(req.body._id, function(err,user){
		if(err){
			res.status(404).send(err);
		}else{
			user.update(req.body, function(err,user){
				if(err){
					res.send(err);
				}else{
					res.status(200).send({message:"success on updating user"});
				}
			});
		}
	});
});

app.use('/', router);
app.use(morgan('dev'));
app.use(express.static(__dirname +'/public'));
app.listen(3000, function(){
  console.log('Listening on port 3000');
});
