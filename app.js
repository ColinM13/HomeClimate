const Influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const jsonParser = bodyParser.json()

const hostname = 'localhost';
const port = 3000;
const databaseName = 'home_climate';

//const corsOptions = {
//    origin: 'http://192.168.1.67'
//}

const influx = new Influx.InfluxDB({
    host: hostname,
    database: databaseName,
    schema: [
        {
            measurement: 'climate',
            fields: {
                temp: Influx.FieldType.FLOAT,
                humidity: Influx.FieldType.FLOAT,
                pressure: Influx.FieldType.FLOAT
            },
            tags: [
                'location'
            ]
        }
    ]
})

//This comes from the node-influx getting started tutorial
influx.getDatabaseNames()
  .then(names => {
    if (!names.includes(databaseName)) {
      return influx.createDatabase(databaseName);
    }
  })
  .then(() => {
    http.createServer(app).listen(port, function () {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })

app.get('/', function (req, res) {
    res.send('Hello World');
})

<<<<<<< HEAD
app.get('/readings', cors(), function(req, res) {
=======
app.get('/readings', function(req, res) {
>>>>>>> bb8544a346ad30ecb885c9d205657cc44879eb63
    influx.query(`
    select * from climate
    order by time desc
    limit 5
    `).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).send(err.stack)
    })
})

app.post('/readings', jsonParser, function(req, res) {
    console.log("incoming data reading")
    const dataReadings = { temp, humidity, pressure } = req.body;
    const location = req.body.location;
    influx.writePoints([
        {
            measurement: 'climate',
            tags: {
                location: location
            },
            fields: {
                temp: dataReadings.temp,
                humidity: dataReadings.humidity,
                pressure: dataReadings.pressure
            },
        }
    ]).then(() => {
        console.log("data received");
        res.sendStatus(201);
    }
    ).catch(err => {
        res.status(500).send(err.stack)
    })
})
