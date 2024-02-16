const request = require("request");


const forecast = (name, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=683186b3de5645ec9c863109241502&q=' + name

    request.get({url : url, json: true}, (error, { body }) => {
        if (error) {
            callback(error)
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(null, {
                Location: body.location.name+' '+body.location.region+' '+body.location.country,
                Current: body.current.temp_c,
                Feel: body.current.feelslike_c,
                Place: body.current.condition.text
            })
        }
    })

}


module.exports = forecast