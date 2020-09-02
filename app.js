const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/contactme', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/contactme");
const app = express();
const port = 80;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Define Mongoo schema
const contactsch = new mongoose.Schema({
    name: String,
    email: String,
    reason: String
  });

  const contact = mongoose.model('contact', contactsch);

//Express stuff
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.use(express.static(__dirname + '/'));

// PUG SPECIFIC STUFF
app.set('view engine', 'html'); // Set the template engine as pug
app.set('personal website', path.join(__dirname, '/personal website')) // Set the views directory
 
app.get('/', (req, res)=>{
   

    res.status(200).render('index.html');
})
 
app.get('/contact', (req, res)=>{
   
    res.status(200).render('./contact.html');
})
app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save()
      .then(contact => {
        res.send("item saved to database");
      })
      .catch(contact => {
        res.status(400).send("unable to save to database");
      });
  });




// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
