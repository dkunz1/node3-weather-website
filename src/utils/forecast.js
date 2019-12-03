const request = require('request')

const forecast = ( latitude, longitude, callback ) =>{
    const url = `https://api.darksky.net/forecast/1833138b89911559a86cbe2f80aae39a/${latitude},${longitude}?units=si&lang=de`
    request(
        {
            url, 
            json: true
        }, 
        (error, {body}) =>{
        if (error) {
            callback(error)
        } else if (body.error) {  
            callback('hi level error')  
        }else {
            const {temperature,precipProbability} = body.currently
        const today = body.daily.data[0].summary
        const high = body.daily.data[0].temperatureHigh
        const low = body.daily.data[0].temperatureLow
        callback(undefined,`${today}
        It is currently ${temperature} degrees out.
        The high today is ${high} and the low is ${low}.
        There is a ${precipProbability}% chance for rain`)
        }
    })    
}

module.exports = forecast
