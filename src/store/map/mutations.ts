import { MutationTree } from 'vuex';
import { MapState } from './state';
import mapboxgl from 'mapbox-gl';
import { Feature } from '../../interfaces/places';
import state from '../places/state';


const mutation: MutationTree<MapState> = {
    setMap(state: MapState, map: mapboxgl.Map ) {
        state.map = map
    },

    setPlaceMarkers(state: MapState, places: Feature[]){

        if (!state.map) return
        // borrar marcadores
        state.markers.forEach(marker => marker.remove())
        state.markers = []

        // crear nuevos marcadores
        for (const place of places) {
            const [lng,lat] = place.center

            const myPopup = new mapboxgl.Popup()
                .setLngLat([lng,lat])
                .setHTML(`
                    <h4>${place.text}</h4>
                    <p>${place.place_name}</p>
                `)

            const marker = new mapboxgl.Marker()
                .setLngLat([lng,lat])
                .setPopup(myPopup)
                .addTo(state.map)

            state.markers.push(marker)
        }
        // clear polyline
        if (state.map.getLayer('RouteString')) {
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
            state.distance = undefined
            state.duration = undefined
        }
    },

    setRoutePolyline(state: MapState, coords: number[][]){
        const start = coords[0]
        const end = coords[coords.length-1]

        // definir los bounds (puntos en el mapa)
        const bounds = new mapboxgl.LngLatBounds(
            [start[0],start[1]],
            [end[0],end[1]]
        )

        // agregar cada punto a los bounds
        for (const coord of coords) {
            const newCoord: [number,number] = [coord[0],coord[1]]
            bounds.extend(newCoord)
        }

        state.map?.fitBounds(bounds,{
            padding: 200
        })

        // polyline
        const sourceData: mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type:'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString',sourceData)

        state.map?.addLayer({
            id:'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint:{
                'line-color': '#42b983',
                "line-width": 3
            }
        })
    },

    setDIstanceDuration(state: MapState, {distance, duration}: {distance: number, duration: number}){

        let kms = distance / 1000
        kms = Math.round(kms*100)
        kms /= 100

        state.distance = kms
        state.duration = Math.floor(duration / 60)
    },
}


export default mutation;