import { ActionTree } from 'vuex';
import { MapState } from './state'
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';
import { Directions } from '@/interfaces/directions';

export type LngLat = [number, number]


const actions: ActionTree<MapState, StateInterface> = {
    async getRouteBetweenPoints( { commit }, {start,end} :{start:LngLat, end:LngLat}  ) {
        const {data} = await directionsApi.get<Directions>(`/${start.join(',')};${end.join(',')}`)
        commit('setDIstanceDuration',{
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
        })
        commit('setRoutePolyline',data.routes[0].geometry.coordinates)
    },
}



export default actions;