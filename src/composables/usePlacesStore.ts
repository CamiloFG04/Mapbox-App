import { computed, onMounted } from "vue"
import { useStore } from "vuex"
import { StateInterface } from "@/store"


export const usePlacesStore = () => {

    const store = useStore<StateInterface>()
    onMounted(() => {
        if (!store.getters['places/isUserLocationReady']) {
            store.dispatch('places/getInitialLocation')
        }
    })

    

    return {
        // state
        isLoading: computed(() => store.state.places.isLoading),
        isLoadingPlaces : computed(() => store.state.places.isLoadingPlaces),
        places: computed(() => store.state.places.places),
        userLocation: computed(() => store.state.places.userLocation),
        
        // getters
        isUserLocationReady: computed<boolean>(() => store.getters['places/isUserLocationReady']),

        // actions
        searchPlacesByTerm: (query = '') => store.dispatch('places/searchPlacesByTerm',query)

        // mutations
    }
}