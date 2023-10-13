import { defineComponent, ref, onMounted, watch } from 'vue';
import { useMapStore, usePlacesStore } from "@/composables";
import mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "MapView",

  setup() {
    const mapElement = ref<HTMLDivElement>()

    const {userLocation,isUserLocationReady} = usePlacesStore()

    const {setMap} = useMapStore()

    const initMap = async () => {
        if(!mapElement.value) return;
        if(!userLocation.value) return;
        
        await Promise.resolve();

        const map = new mapboxgl.Map({
            container: mapElement.value, // container ID
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: userLocation.value, // starting position [lng, lat]
            zoom: 15, // starting zoom
        });

        const myLocationPopup = new mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setHTML(`
            <h4>Aquí estoy</h4>
            <p>Actualmente en Bogotá</p>
            <p>${userLocation.value}</p>
        `)

        const myLocationMarker = new mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map)

        // TODO: establecer el mapa en vuex
        setMap(map)

    }
    

    onMounted(() => {
        if(isUserLocationReady.value) return initMap()
        
    })

    watch(isUserLocationReady,() => {
        if (isUserLocationReady.value) initMap()
    })
    
    return {
        isUserLocationReady,
        mapElement
    };
  },
});
