import fs from 'fs';

import axios from 'axios';

class Busquedas {

    historial = [];
    DBPath = './db/data.json';

    constructor() {
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5,
        }
    }

    async cuidad(lugar) {

        try {
            //Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const res = await instance.get();

            return res.data.features.map(lugar => {
                return {
                    id: lugar.id,
                    name: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
                }
            });

        } catch (error) {
            return [];
        }
    }

    get paramsOpenWeather() {

        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric',
        }
    }

    async climaLugar(lat, lon) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}`,
                params: this.paramsOpenWeather
            })

            const res = await instance.get();

            return {
                desc: res.data.weather[0].description,
                min: res.data.main.temp_min,
                max: res.data.main.temp_max,
                temp: res.data.main.temp,

            }

        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar) {

        if (!this.historial.includes(lugar)) {

            this.historial = this.historial.splice(0, 4)
            this.historial.unshift(lugar);
        }

        this.guardarDB();
    }

    guardarDB() {

        const objHistorial = {
            historial: this.historial
        }

        fs.writeFileSync(this.DBPath, JSON.stringify(objHistorial))
    }

    leerDB() {
        if (!fs.existsSync(this.DBPath)) {
            return;
        }
        const historialJSON = fs.readFileSync(this.DBPath, { encoding: 'utf-8' });
        const data = JSON.parse(historialJSON);
        this.historial = data.historial;
    }
}


export {
    Busquedas
}