const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const connectDB = require('./db');
const PORT = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

//connection db
require('./db');
connectDB();
const articalSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Artical = mongoose.model('Artical', articalSchema);

// const artical_1 = new Artical({
//     title: "DOM",
//     content: "DOM manipulation is very important topic  "
// })
// artical_1.save();
// const artical_2 = new Artical({
//     title: "Bootstarp",
//     content: "Bootstrap is an amazing frame work min write get more and osm output  "
// })
// artical_2.save();
// const artical_3 = new Artical({
//     title: "Jquery",
//     content: "Jquery just make easy to use the javascript and min code have a lot value  "
// })
// artical_3.save();


//Get route
// app.get('/articals', (req, res) => {
//     Artical.find((err, foundedItems) => {
//         if (!err) {
//             res.send(foundedItems)
//         }
//         else {
//             res.send(err)
//         }
//     })
// })
// //POST Route
// app.post('/articals', (req, res) => {
//     const newArtical = new Artical({
//         title: req.body.title,
//         content: req.body.content
//     })
//     newArtical.save((err) => {
//         if (!err) {
//             res.send('Succesfully added a new Atrical')
//         }
//         else {
//             res.send(err)
//         }
//     })
// })

// //Delete Route

// app.delete('/articals', (req, res) => {
//     Artical.deleteMany((err) => {
//         if (!err) {
//             res.send('Succesfully delete All data')
//         }
//         else {
//             res.send(err)
//             console.log(err);
//         }
//     })
// })

///////////////////////////Request targeting the whole data///////////////////////////

//Get ,post Delete using Express route method

app.route('/articals')
    .get((req, res) => {
        Artical.find((err, foundedItems) => {
            if (!err) {
                res.send(foundedItems);
            }
            else {
                res.send(err)
            }
        })
    })
    .post((req, res) => {
        const newArtical = new Artical({
            title: req.body.title,
            content: req.body.content
        })
        newArtical.save((err) => {
            if (!err) {
                res.send('Artical added succsesfully')
            } else {
                res.send(err)
            }
        })
    })
    .delete((req, res) => {
        Artical.deleteMany((err) => {
            if (!err) {
                res.send('All data deleted succsesfully')
            } else {
                res.send(err)
            }
        })
    });

///////////////////////////Request targeting the specific data///////////////////////////

app.route('/articals/:articalTitle')
    .get((req, res) => {
        //Artical have a space e.g (body parser  = body%20parser)
        const articalTitle = req.params.articalTitle
        Artical.findOne({ title: articalTitle }, (err, item) => {
            console.log(item);
            if (item) {
                res.send(item)
            } else {
                res.send('No such artical found')
            }
        })
    })
    .put((req, res) => {
        Artical.update({ title: req.params.articalTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            { overwrite: true },
            (err) => {
                if (!err) {
                    res.send("Artical succesfully updated")
                } else {
                    res.send(err)
                }
            }
        )
    })
    .patch((req, res) => {
        const articalTitle = req.params.articalTitle
        Artical.update({ title: articalTitle },
            { $set: req.body },
            (err) => {
                if (!err) {
                    res.send("Succesfully updated the artical")
                } else {
                    res.send(err)
                }
            }
        )
    })
    .delete((req, res) => {
        const articalTitle = req.params.articalTitle;
        Artical.deleteOne({ title: articalTitle },
            (err) => {
                if (!err) {
                    res.send('Artical deleted succesfull ')
                } else {
                    res.send(err)
                }
            }
        )
    });


app.listen(PORT, () => {
    console.log(`seever is listening at port${PORT}`);
})