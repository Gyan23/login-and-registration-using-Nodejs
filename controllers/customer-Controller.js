var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
module.exports =function(app){

    app.get('/',function(req,res){
        res.sendfile('./views/index.html');
    });

    app.post('/auth',urlencodedParser,function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        if (username != "" && password != "" ) {
            //console.log(username + password);
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("customer");
                var query = {name:username,password:password};
                dbo.collection("registraion").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    db.close();
                });
            });
            res.sendfile('./views/homepage.html');
        } else {
            res.sendfile('./views/index.html');
        }
    });

    app.get('/registration',function(req,res){
        res.sendfile('./views/registration.html');
    });

    app.post('/reg-auth',urlencodedParser,function(req,res){
        var username = req.body.username;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
       
        if(username  != "" && lastname != "" && email != "" && password !="")
        {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("customer");
                var myobj = { name: username, lastname: lastname , email:email,password:password };
                dbo.collection("registration").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
            res.sendfile('./views/index.html');
        }
        else{
            res.sendfile('./views/registration.html');
        }
    });

};