const express = require('express');
const app = express();
//const db = require('./quaries');
//const bodyParser = require('-/quaries');
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log("kuuntelen" + port));
app.use(express.static("public"));

app.use(express.json({limit:'1mb'}));

const highscore =[
  {
    "Name": "Taavi",
    "Score": "10"
  },
  {
    "Name": "Ismo",
    "Score": "8"
  },
  {
    "Name": "Arzga",
    "Score": "6"
  }
]
app.get('/api/highscore', function (request, response){
  response.send(highscore);
})

app.post('/api/highscore', function (request,response)
{
  response.send(highscore);
})
