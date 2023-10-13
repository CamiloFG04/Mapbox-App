import { computed, defineComponent, ref } from "vue";
import SearchResults from "../search-results/SearchResults.vue"
import { usePlacesStore } from "@/composables";

export default defineComponent({
  name: "SearchBar",
  components:{
      SearchResults
  },
  setup() {

    const debounceTimeout = ref()
    const debounceValue = ref('')
    const {searchPlacesByTerm} = usePlacesStore()

    
    return {
      searchTerm: computed({
        get(){
          return debounceValue.value
        },
        set(val: string){
          if(debounceTimeout.value) clearTimeout(debounceTimeout.value)
          debounceTimeout.value = setTimeout(() => {
            debounceValue.value = val
            searchPlacesByTerm(val)
          }, 500);
        }
      }),
    };
  },
});
