const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var userNameKarbar = '';
var passKarbar = '';
var idKarbar = '';


app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
var dburl = 'mongodb://ali:alicr7@ds119732.mlab.com:19732/heroku_lzflnmh9';

io.on('connection', (socket) =>{
    console.log('new User Connected');

    socket.on('register',(uss,pass) => {
            console.log('createdUSer',pass);

        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Users').insertOne({
                userName:uss,
                Password:pass
            },(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }
                console.log(JSON.stringify(result.ops,undefined,2));
            });
            db.close();
        });

    });



    socket.on('addStaff',(fullnameStaff,positionStaff) => {
        console.log('addStaff',positionStaff);
        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Staff').insertOne({
                fullName:fullnameStaff,
                position:positionStaff,
                companyid:idKarbar,
                staffID:makeIdForStaff(),
                customerVoteDayCount:0,
                customerVoteDayPercent:0,
                workmateVoteDayPercent:0,
                workmateVoteDayCount:0,
                customerVoteMounthCount:0,
                customerVoteMounthPercent:0,
                workmateVoteMounthPercent:0,
                workmateVoteMounthCount:0,
                customerVoteYearCount:0,
                customerVoteYearPercent:0,
                workmateVoteYearPercent:0,
                workmateVoteYearCount:0,

            },(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }
                console.log(JSON.stringify(result.ops,undefined,2));
            });
            db.close();
        });

    });


    socket.on('join', function(userNickname,usernickname2,usernickname3) {

        console.log(userNickname +" : has joined the chat "  );

        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Staff').insertOne({
                fullName:userNickname,
                position:usernickname2,
                fuck:usernickname3
            },(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }
                console.log(JSON.stringify(result.ops,undefined,2));
            });
            db.close();
        });
    });



    socket.on('findUser',(userDaryaftiFind)=>{

        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Users').findOne({"userName":userDaryaftiFind},(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }else {
                    if(result == null){
                        console.log("sheat");
                        socket.emit('checkUserName',false);

                    }else {
                        console.log(result);
                        socket.emit('checkUserName',true);
                    }

                }

            });
            db.close();
        });


    });
    socket.on('findStaff',(userDaryaftiFind)=>{

        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Staff').findOne({"fullName":userDaryaftiFind},(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }else {
                    if(result == null){
                        console.log("sheat");
                        socket.emit('staffTekrariCheck',false);

                    }else {
                        console.log(result);
                        socket.emit('staffTekrariCheck',true);
                    }

                }

            });
            db.close();
        });


    });
    socket.on('searchStaff',(userDaryaftiFind)=>{

        MongoClient.connect(dburl,(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Staff').findOne({"staffID":userDaryaftiFind},(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }else {
                    socket.emit('showUserDetailPopUp',result);
                }

            });
            db.close();
        });


    });
    socket.on('listStaff',()=>{

        var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb://ali:alicr7@ds119732.mlab.com:19732/heroku_lzflnmh9';

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("heroku_lzflnmh9");
            dbo.collection("Staff").find({}, { companyid: idKarbar }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                socket.emit('showListUser',result);
                db.close();
            });
        });

    });
    socket.on('logIn',(userDaryaftiFind,password)=>{
        console.log('usere daryafti'+userDaryaftiFind +'   '+password);

        MongoClient.connect('mongodb://ali:alicr7@ds119732.mlab.com:19732/heroku_lzflnmh9',(err,db)=>{
            if (err){
                return console.log('unable to connect to mongo db server');
            }
            console.log('Connected to mongo db server');

            db.db("heroku_lzflnmh9").collection('Users').findOne({"userName":userDaryaftiFind},(err,result)=>{
                if (err){
                    return console.log('Unable to insert todo',err);
                }else {
                    if(result == null){
                        console.log("sheat");
                        socket.emit('checkEnterAcount',false);

                    }else {
                        console.log('salam logIn.....username'+result.userName+'  pass  '+result.Password+" id ham =",result._id);
                        userNameKarbar = result.userName;
                        passKarbar = result.Password;
                        idKarbar = result._id;
                        if (password == result.Password){
                            //LogIn
                            socket.emit('checkEnterAcount',true);
                        }else {
                            socket.emit('checkEnterAcount',false);
                        }
                    }

                }

            });
            db.close();
        });



    });
    socket.on('saveUserWhenLogInSqlite',(userNameKarbar,passwordKarbar)=>{
        db.serialize(function () {
            db.run('CREATE TABLE if NOT Exists user (id INT ,userName TEXT , password TEXT)');

            var stmt = db.prepare('Insert into user values(?,?,?)');

            stmt.run(1,userNameKarbar,passwordKarbar);

            stmt.finalize();


            db.each('Select * from user',function (err,row) {
                console.log('User id '+row.id +" userName ="+row.userName ,+" pass ="+row.Password);
            });

        });

    });

});




app.get("/",function (req,res) {
    res.status(200)
     .sendFile(path.join(__dirname,"login.html"));
    var userss;
    db.serialize(function () {
        db.run('CREATE TABLE if NOT Exists user (id INT ,userName TEXT , password TEXT)');

        db.each('Select * from user where id = 1',function (err,row) {
            console.log('User id '+row.id +" userName ="+row.userName ,+" pass ="+row.Password);
            userss = row.userName;
            console.log('salam azizam usere Karbar =  '+userNameKarbar);
           if (userss == undefined){
               var stmt = db.prepare('Insert into user values(?,?,?)');
               stmt.run(1,"","");
           } else {

           }
       });

   });

});

app.get("/login",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"login.html"));
});

app.get("/lost",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"lost.html"));
});
app.get("/register",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"register.html"));
});
app.get("/main",function (req,res) {
    console.log('salam azizam usere Karbar =  '+userNameKarbar + " "+passKarbar +" "+idKarbar);
    res.status(200)
        .sendFile(path.join(__dirname,"main.html"));
});
app.get("/dashboard",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"dashboard.html"));
});
app.get("/notification",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"notification.html"));
});
app.get("/staff",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"staff.html"));
});
app.get("/organization",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"organization.html"));
});
app.get("/organizationwarning",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"organizationwarning.html"));
});
app.get("/poll",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"poll.html"));
});
app.get("/organizationresult",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"organizationresult.html"));
});
app.get("/staffwarning",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"staffwarning.html"));
});app.get("/notification",function (req,res) {
    res.status(200)
        .sendFile(path.join(__dirname,"notification.html"));
});


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

function makeIdForStaff() {
    var date = new Date();
    var newID = date.getFullYear()+'/'+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds();
    console.log('new ID is ........'+ newID);
    return newID;
}