const request = require('request')

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuaWVsYWt1bnoxIiwiYSI6ImNqeWVxZTE3NDAzbjUzaXFpNGRhOG1xcmIifQ.7Yt4wcQumswLP9VqgoqthQ&limit=1`

    request({url, json:true}, (error, {body}) => {
    if(error) {
        callback('unable to connect to location services!')
    }else if(body.features.length === 0){
        callback('unable to find location. Try another serach')
    } else {
        const {center, place_name} = body.features[0]
        callback(undefined,{
            longitude: center[0],
            latitude: center[1],
            location:  place_name
        })
    }

})
}
module.exports = geocode