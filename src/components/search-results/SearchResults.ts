import { defineComponent, ref, watch } from 'vue';
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from '@/interfaces/places';

export default defineComponent({
  name: "SearchResults",

  setup() {

    const {isLoadingPlaces,places, userLocation} = usePlacesStore()
    const {map,setPlaceMarkers,getRouteBetweenPoints} = useMapStore()
    
    const activePlace = ref('');

    watch(places,(newPlaces) => {
      setPlaceMarkers(newPlaces)
    })

    return {
      isLoadingPlaces,
      places,
      activePlace,

      onPlaceClick: (place:Feature) => {
        activePlace.value = place.id
        const [lng, lat] = place.center
        map.value?.flyTo({
          center: [lng, lat],
          zoom: 15
        })
      },
      onDirectionClick: (place:Feature) => {
        if (!userLocation.value) return 

        const [startLng, startLat] = userLocation.value
        const [lng, lat] = place.center

        const start: [number,number] = [startLng, startLat]
        const end: [number,number] = [lng, lat]

        getRouteBetweenPoints(start,end)
      }


    };
  },
});
