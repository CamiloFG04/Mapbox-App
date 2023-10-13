import axios from "axios";
const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        notifications: 'none',
        access_token: 'pk.eyJ1Ijoid2FpZnUyMiIsImEiOiJjbG5ua3N2MXcwNXhqMmpvMWR4aWRtZTdtIn0.nKKFDKgzDvkaV9m29HQUKQ'
    }
})

export default searchApi