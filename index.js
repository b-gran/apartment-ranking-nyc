// The name of the starting location. We will have to geocode this to coordinates.
const startingLocation = '770 Broadway, New York, NY 10003'

// The departure time in an ISO format.
const departureTime = new Date().toJSON()

// Travel time in seconds. We want 1 hour travel time so it is 60 minutes x 60 seconds.
const travelTime = 60 * 60

// These secret variables are needed to authenticate the request. Get them from http://docs.traveltimeplatform.com/overview/getting-keys/ and replace
const APPLICATION_ID = '23161156'
const API_KEY = '56d80e25ac8cad0503498061b503395a'

const mymap = L.map('mapid').setView([40.742584, -73.983831], 14)

sendGeocodingRequest(startingLocation)

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }
).addTo(mymap)

// Sends the geocoding request.
function sendGeocodingRequest (location) {
  // The request for the geocoder. Reference: http://docs.traveltimeplatform.com/reference/geocoding-search/
  const request = {
    query: location
  }
  document.getElementById('error').style.display = 'none'
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open(
    'GET',
    'https://api.traveltimeapp.com/v4/geocoding/search?query=' + location
  )
  xhr.setRequestHeader('X-Application-Id', APPLICATION_ID)
  xhr.setRequestHeader('X-Api-Key', API_KEY)
  xhr.setRequestHeader('Accept-Language', 'en-US')
  xhr.onreadystatechange = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (xhr.readyState === 4) {
        sendTimeMapRequest(xhr.response)
      }
    } else {
      if (
        APPLICATION_ID === 'place your app id here' ||
        API_KEY === 'place your api key here'
      ) {
        document.getElementById('error').style.display = 'block'
      } else {
        console.error('Geocoding error:')
        console.log(xhr)
      }
    }
  }

  xhr.send()
}

// Sends the request of the Time Map multipolygon.
function sendTimeMapRequest (geocodingResponse) {
  // The request for Time Map. Reference: http://docs.traveltimeplatform.com/reference/time-map/
  const coords = geocodingResponse.features[0].geometry.coordinates
  const latLng = {lat: coords[1], lng: coords[0]}

  const request = {
    departure_searches: [
      {
        id: 'first_location',
        coords: latLng,
        transportation: {
          type: 'public_transport'
        },

        departure_time: departureTime,
        travel_time: travelTime
      }
    ],

    arrival_searches: []
  }

  const xhr = new XMLHttpRequest()
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      drawTimeMap(mymap, this.response)
    }
  })
  xhr.open('POST', 'https://api.traveltimeapp.com/v4/time-map')
  xhr.setRequestHeader('X-Application-Id', APPLICATION_ID)
  xhr.setRequestHeader('X-Api-Key', API_KEY)
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  xhr.responseType = 'json'
  xhr.send(JSON.stringify(request))

  // A helper function that converts [{lat: <lat>, lng: <lng>}, ...] to a [[<lat>, <lng>], ...] format.
  function ringCoordsHashToArray (ring) {
    return ring.map(function (latLng) {
      return [latLng.lat, latLng.lng]
    })
  }

  // Draws the resulting multipolygon from the response on the map.
  function drawTimeMap (map, response) {
    // Reference for the response: http://docs.traveltimeplatform.com/reference/time-map/#response-body-json-attributes
    const shapesCoords = response.results[0].shapes.map(function (polygon) {
      const shell = ringCoordsHashToArray(polygon.shell)
      const holes = polygon.holes.map(ringCoordsHashToArray)
      return [shell].concat(holes)
    })
    const polygon = L.polygon(shapesCoords, {color: 'red'})
    polygon.addTo(map)
    map.fitBounds(polygon.getBounds())
  }
}
