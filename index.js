import 'dotenv/config';

import { inquirerMenu, leerInput, pause, mostrarCiudades } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';


const main = async () => {

    const busquedas = new Busquedas;
    let opt;


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Show place msj
                const lugar = await leerInput('Ciudad:');

                //Search places
                const ciudades = await busquedas.cuidad(lugar);

                //Place id selected
                const id = await mostrarCiudades(ciudades);
                if (id === 0) continue;

                const ciudadSel = ciudades.find(lugar => lugar.id === id);

                //Save DB
                busquedas.agregarHistorial(ciudadSel.name);

                //Weather data
                const clima = await busquedas.climaLugar(ciudadSel.lat, ciudadSel.lng);

                //Show place info 
                console.log('\nInformación de la cuidad\n'.green);
                console.log('Ciudad:', ciudadSel.name.green);
                console.log('Lat:', ciudadSel.lat);
                console.log('Lng:', ciudadSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como esta el clima:', clima.desc.toUpperCase().green);
                break;

            case 2:
                //Record
                busquedas.historial.forEach((lugar, index) => {

                    console.log(`${(index + 1 + '.').green} ${lugar}`);
                })
                break;
        }

        if (opt !== 0) await pause();

    } while (opt !== 0);
}


main();