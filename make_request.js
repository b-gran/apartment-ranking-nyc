const latLngBill = {
  lat: 40.730990,
  lng: -73.991388,
}

const latLngCaseyOffice = {
  lat: 40.730755,
  lng: -74.007083,
}

// West 4th Street Subway station
const latLngCasey = {
  lat: 40.732316,
  lng: -74.000517,
}

const arrivalTimeBill = '2020-02-24T15:15:24.232Z'
const arrivalTimeCasey = '2020-02-24T14:30:24.232Z'

const SEC_IN_MINUTE = 60

const request = {
  departure_searches: [],

  arrival_searches: [
    {
      id: 'bill_15_min',
      coords: latLngBill,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeBill,
      travel_time: 15*SEC_IN_MINUTE
    },
    {
      id: 'bill_20_min',
      coords: latLngBill,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeBill,
      travel_time: 20*SEC_IN_MINUTE
    },
    {
      id: 'bill_25_min',
      coords: latLngBill,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeBill,
      travel_time: 25*SEC_IN_MINUTE
    },
    {
      id: 'bill_30_min',
      coords: latLngBill,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeBill,
      travel_time: 30*SEC_IN_MINUTE
    },
    
    {
      id: 'casey_15_min',
      coords: latLngCasey,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeCasey,
      travel_time: 15*SEC_IN_MINUTE
    },
    {
      id: 'casey_20_min',
      coords: latLngCasey,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeCasey,
      travel_time: 20*SEC_IN_MINUTE
    },
    {
      id: 'casey_25_min',
      coords: latLngCasey,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeCasey,
      travel_time: 25*SEC_IN_MINUTE
    },
    {
      id: 'casey_30_min',
      coords: latLngCasey,
      transportation: {
        type: 'public_transport'
      },

      arrival_time: arrivalTimeCasey,
      travel_time: 30*SEC_IN_MINUTE
    }
  ],

  intersections: [
    {
      id: '15_min',
      search_ids: [
        'bill_15_min', 'casey_15_min'
      ]
    },
    {
      id: '20_min',
      search_ids: [
        'bill_20_min', 'casey_20_min'
      ]
    },
    {
      id: '25_min',
      search_ids: [
        'bill_25_min', 'casey_25_min'
      ]
    },
    {
      id: '30_min',
      search_ids: [
        'bill_30_min', 'casey_30_min'
      ]
    },
  ]
}

console.log(JSON.stringify(request, null, '  '))
