const express = require('express');
const bodyParser = require('body-parser');

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

