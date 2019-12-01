const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const pubPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(pubPath))

app.get('',(req,res) => {
    res.render('index',{
        title:"Weather App",
        name: "Fabian Hotze"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About Me",
        name: "Fabian Hotze"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help Page",
        name: "Fabian Hotze",
        text:"Help text"
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    
    if(!address) {
        return res.send({
            error: "Address is missing"
        })
    }

    geocode(address, (error,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        console.log('found location: ',location)
        
        forecast(latitude,longitude,(error,data) => {
            if (error) {
                return res.send({
                    error: result.error
                })
            }
            
            res.send({
                forecast: 'Weather forecast',
                location: location,
                forecastData: data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error:'Missing search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',
    {
        title: "404",
        name: "Fabian Hotze",
        text:"Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',
    {
        title: "404",
        name: "Fabian Hotze",
        text:"Page not found"
    })
})

app.listen(port,() =>{
    console.log(`Server is up on port ${port}.`)
})