import axios from "axios";
const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1Ijoid2FpZnUyMiIsImEiOiJjbG5ua3N2MXcwNXhqMmpvMWR4aWRtZTdtIn0.nKKFDKgzDvkaV9m29HQUKQ'
    }
})

export default searchApi