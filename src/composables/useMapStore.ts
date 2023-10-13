import { Feature } from "@/interfaces/places"
import { StateInterface } from "@/store"
import { LngLat } from "@/store/map/actions"
import mapboxgl from "mapbox-gl"
import { computed } from "vue"
import { useStore } from "vuex"


export const useMapStore = () => {

    const store = useStore<StateInterface>()


    return {
        // state
        distance: computed(() => store.state.map.distance),
        duration: computed(() => store.state.map.duration),
        map: computed(() => store.state.map.map),
        markers: computed(() => store.state.map.markers),

        // getters
        isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),

        // mutations
        setMap: (map: mapboxgl.Map) => store.commit('map/setMap', map),
        setPlaceMarkers: (places: Feature[]) => store.commit('map/setPlaceMarkers',places),

        // actions
        getRouteBetweenPoints:(start: LngLat, end: LngLat) => store.dispatch('map/getRouteBetweenPoints',{start,end})
    }

}