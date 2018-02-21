// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/client/dist' ));
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authorDB');
mongoose.Promise = global.Promise;


let AuthorSchema = new mongoose.Schema({
    name: {required: true, type: String, minlength: [3, "At least 3 characters for author's name"]},
    quotes: [{required: true, type: String, votes: Number, minlength: [3, "At least 3 characters for quotes"]}]
}, {timestamps: true})


let Author = mongoose.model("Author", AuthorSchema);
// ==============================




// ===== ROUTES! ======
// Retrieve all Tasks
app.get('/authors', function(req, res){
    Author.find({}, function(err, results){
        if(err){
            res.json({message: "Error", error: err})
        }else{
            // console.log(results);
            res.json(results);
        }
    })
})

// Create
app.post('/authors', function(req, res){
    console.log(req.body);
    let newAuthor = new Author(req.body);
    newAuthor.save(function(err){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json("create success")
        }
    })
})

// Update by ID
app.put('/authors/:editTaskId', function(req, res) {
    console.log("111", req.body);
    editTaskId = req.params.editTaskId;
    console.log(editTaskId);
    Author.findOne({_id: editTaskId}, function(err, author) {
        if (err) {
			console.log('Update error', err);
		} else {
            author.name = req.body.name;
           
            author.save(function(err) {
                if(err) {
                    console.log("err from task update: ", err);
                }
                else {
                    res.json("success update task");
                }
            })
		}
    })
})

// Delete by ID
app.delete('/authors/:deleteTaskId', function(req, res){
    Author.remove({_id: req.params.deleteTaskId}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message:'Success delete'});
        }
    })
})



// ======================
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("client/dist/index.html"))
  });
// ======================


// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================