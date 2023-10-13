<script lang="ts" src="./TripDetails.ts"/>
<template>
    <div v-if="distance || duration" class="trip-container column" >
        <div class="col">
            Distancia: <strong>{{distance}}KM</strong>
        </div>
        <div class="col">
            Duración: <strong>{{duration}} minutos</strong>
        </div>
    </div>
</template>

<style scoped>
    .trip-container{
        position: fixed;
        background-color: white;
        border-radius: 10px;
        bottom: 50px;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        font-size: 25px;
        left: 20px;
        padding: 10px;
        width: 350px;
        z-index: 9999;
    }
    strong{
        color: #42b983;
    }
</style>