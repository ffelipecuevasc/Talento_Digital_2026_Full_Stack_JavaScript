import chalk from 'chalk';
import dayjs from 'dayjs';

// 1. Obtener y formatear la fecha/hora actual usando dayjs
const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

// 2. Mostrar la fecha y hora actual formateada
console.log(`Fecha actual: ${currentDate}`);

// 3. Mostrar un mensaje de bienvenida en color verde usando chalk.green()
console.log(chalk.green('¡Bienvenido a nuestra aplicación moderna en Node.js!'));

// 4. Mostrar un mensaje adicional en color amarillo con la fecha y hora actual
console.log(chalk.yellow(`Registro de actividad: El sistema fue inicializado exitosamente el ${currentDate}.`));