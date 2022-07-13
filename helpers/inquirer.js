import inquirer from 'inquirer';
import colors from 'colors';

const questionsObj = [
    {
        type: 'list',
        name: 'options',
        message: 'Elija una opción:',
        choices: [
            {
                value: 1,
                name: `${"1".green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${"2".green} Historial`,
            },
            {
                value: 0,
                name: `${"3".green} Salir`,
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('========================'.green);
    console.log('  Seleccione una opción'.white);
    console.log('========================'.green);

    const { options } = await inquirer.prompt(questionsObj);

    return options;
}

const pause = async () => {

    const pausa = [
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(pausa);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                } else {
                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const mostrarCiudades = async (ciudad) => {

    const choices = ciudad.map((ciudad, index) => {

        return {
            value: ciudad.id,
            name: `${colors.green((index + 1) + '.')} ${ciudad.name}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0. '.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione ciudad:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}



const confirmDelete = async (message) => {

    const confirm = [
        {
            type: 'confirm',
            name: 'res',
            message
        }
    ];
    const { res } = await inquirer.prompt(confirm);
    return res
};

const completarTareas = async (tareas = []) => {

    const choices = tareas.map((tarea, index) => {

        return {
            value: tarea.id,
            name: `${colors.green((index + 1) + '.')} ${tarea.description}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



export {
    inquirerMenu,
    pause,
    leerInput,
    mostrarCiudades,
    confirmDelete,
    completarTareas
}
