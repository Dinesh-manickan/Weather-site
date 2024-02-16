const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')


// Set handlers engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set Static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index',{
        title: 'Welcome to the app',
        name: 'Dinesh',
    })

})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Dinesh',
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Dinesh',
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must prodive a address query"
        })
    }
    console.log(req.query.address)
    forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }

        res.send(data)

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must prodive a search query"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Dinesh',
        errorMessage: 'Help article not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Dinesh',
        errorMessage: 'Page not Found'
    })
})


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})