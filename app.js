const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { getAllFlightsDetails } = require('./db/flights')


const app = express()

const PORT = 3000;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://127.0.0.1:5173'
}))



const getAllFlightsFromMySQL = () => {
    // DUMMY
    const flights = [
        { airlineName: 'El Al', destination: 'Israel', arrivalTime: '10:00' },
        { airlineName: 'WizzAir', destination: 'NY', arrivalTime: '11:00' },
        { airlineName: 'Lufthansa', destination: 'Dubai', arrivalTime: '13:00' }
    ]
    return flights
}


app.get('/', (req, res) => {
    const flights = getAllFlightsFromMySQL();
    res.render('index.ejs', { flights })
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    console.log(req.body)
    const formData = req.body
    const validData = true; //This is we should check in database 
    if (!validData) {
        res.render('register.ejs', { message: `The user ${req.body.name} is already exist`, formData })
    } else {
        res.redirect('/')
    }
})

app.get('/api/flights', async (req, res) => {
    try {
        const flights = await getAllFlightsDetails();
        res.json(flights)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/', (req, res) => {
    console.log('hello from express post')
    res.send('hello from express post')
})

app.post('/user', (req, res) => {
    console.log(req.body)
    //send data to database , validate data
    console.log('hello from express post')
    res.send('hello from express post')
})

app.delete('/', (req, res) => {
    console.log('hello from express delete')
    res.send('hello from express delete')
})


app.listen(PORT, () => {
    `express server is running on port ${PORT}`
})