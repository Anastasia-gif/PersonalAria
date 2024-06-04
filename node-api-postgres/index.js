const express = require('express');
const bodyParser = require('body-parser');
const db = require("./queries");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

app.get('/',(request, response)=>{
    response.json({Info:'WEBAPI с использованием Node.js, Express, PostgreSQL'});
});

app.listen(port, () =>{
    console.log(`Приложение запущено на порту - ${port}`);
});


app.get('/data_user', db.getUsers);
app.get('/data_user/:id', db.getUserById);
app.post('/data_user', db.createUser);
app.put('/data_user', db.updateUser);
app.delete('/data_user', db.deleteUser)    