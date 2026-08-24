import express from "express";
import validator from 'validator';
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import Dueno from "../models/dueno.js";
import Mascota from "../models/mascota.js";

import {registrarActividad} from "../helpers/logger.js";
import {estaAutenticado} from "../middlewares/auth.js";

dayjs.locale("es");

const router = express.Router();

// Activación del Middleware que valida si el usuario está autenticado para acceder a las rutas de abajo
router.use(estaAutenticado);

/* -------------------------------------------
 * CRUD - READ
 * GET | RUTA DE INICIO (/)
 * -------------------------------------------
 * Si el usuario está autenticado, redirecciona a la VISTA de inicio de mascotas (mascotas.ejs)
 */
router.get('/', async (req, res) => {
    try {
        registrarActividad(`🌐 GET /mascotas - Acceso autorizado para ${req.session.usuario.email}.`);

        const mascotas = await Mascota.findAll({
            include: { association: 'dueno' },
            order: [['id', 'DESC']],
        });

        const listaMascotas = mascotas.map((mascota) => {
            const m = mascota.toJSON();
            return {
                id: m.id,
                nombre: m.nombre,
                especie: m.especie,
                raza: m.raza,
                edad: m.edad,
                sexo: m.sexo,
                fechaIngresoFormateada: dayjs(m.fechaIngreso).format('DD/MM/YYYY'),
                nombreDueno: m.dueno.nombre,
            };
        });

        res.render('mascotas', {
            title: 'Mis Mascotas | VetCare Pro',
            nombreClinica: 'VetCare Pro',
            listaMascotas
        });
    } catch (error) {
        registrarActividad(`❌ GET /mascotas - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos cargar el listado de mascotas desde la BD en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

/* -------------------------------------------
 * CRUD - CREATE
 * GET | RUTA PARA MOSTRAR LA VISTA EJS PARA CREAR MASCOTAS (/crear)
 * -------------------------------------------
 * Si el usuario está autenticado, redirecciona a la VISTA que muestra un formulario para crear mascotas (mascotas_create.ejs)
 */
router.get('/crear', async (req, res) => {
    try {
        registrarActividad(`🌐 GET /mascotas/crear - Acceso autorizado para ${req.session.usuario.email}.`);

        const duenos = await Dueno.findAll({
            order: [['nombre', 'ASC']],
        });

        const listaDuenos = duenos.map((dueno) => dueno.toJSON());

        res.render('mascotas_create', {
            title: 'Registrar Mascota | VetCare Pro',
            nombreClinica: 'VetCare Pro',
            listaDuenos
        });
    } catch (error) {
        registrarActividad(`❌ GET /mascotas/crear - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos cargar el formulario de registro en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

/* -------------------------------------------
 * CRUD - CREATE
 * POST | RUTA PARA REGISTRAR EN LA BD UNA NUEVA MASCOTA (/crear)
 * -------------------------------------------
 * Si el usuario está autenticado, procedemos a conectarnos a PostgreSQL y realizar el ingreso de la nueva mascota
 */
router.post('/crear', async (req, res) => {
    try {
        const { nombre, especie, raza, edad, sexo, duenoId } = req.body;

        if (!nombre || !especie || !sexo || !raza || edad === undefined || edad === '') {
            registrarActividad(`🌐❌ POST /mascotas/crear - ERROR: Datos incompletos en el formulario (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'Debes completar todos los campos del formulario: nombre, especie, raza, edad y sexo de la mascota.',
                error: { status: 400, stack: 'Revisa el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const edadNumerica = Number(edad);
        if (!Number.isInteger(edadNumerica) || edadNumerica < 0) {
            registrarActividad(`🌐❌ POST /mascotas/crear - ERROR: Edad inválida (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'La edad debe ser un número entero mayor o igual a 0.',
                error: { status: 400, stack: 'Revisa el campo de edad en el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        if (!['Macho', 'Hembra'].includes(sexo)) {
            registrarActividad(`🌐❌ POST /mascotas/crear - ERROR: Sexo inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El sexo debe ser Macho o Hembra.',
                error: { status: 400, stack: 'Revisa el campo de sexo en el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        // --- Validación nueva de esta fase: el dueño elegido tiene que ser real ---
        const duenoIdNumerico = Number(duenoId);
        if (!Number.isInteger(duenoIdNumerico) || duenoIdNumerico <= 0) {
            registrarActividad(`🌐❌ POST /mascotas/crear - ERROR: Dueño inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'Debes seleccionar un dueño válido para la mascota.',
                error: { status: 400, stack: 'Revisa el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const dueno = await Dueno.findByPk(duenoIdNumerico);
        if (!dueno) {
            registrarActividad(`🌐❌ POST /mascotas/crear - ERROR: Dueño inexistente (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El dueño seleccionado no existe.',
                error: { status: 400, stack: 'Verifica el listado y reintenta.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        await Mascota.create({
            duenoId: duenoIdNumerico,
            nombre: validator.escape(nombre),
            especie: validator.escape(especie),
            raza: validator.escape(raza),
            edad: edadNumerica,
            sexo,
        });

        registrarActividad(`🌐 POST /mascotas/crear - ÉXITO: Mascota ${nombre} registrada exitosamente en la BD (${req.session.usuario.email}).`);

        res.redirect('/mascotas');
    } catch (error) {
        registrarActividad(`❌ POST /mascotas/crear - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos registrar la mascota en la BD en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

/* -------------------------------------------
 * CRUD - UPDATE
 * GET | RUTA PARA MOSTRAR LA VISTA EJS PARA EDITAR UNA MASCOTA (/id/editar)
 * -------------------------------------------
 * Si el usuario está autenticado, redirecciona a la VISTA que muestra un formulario para editar una mascota (mascotas_update.ejs)
 */
router.get('/:id/editar', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 0) {
            registrarActividad(`🌐❌ GET /mascotas/id/editar - ERROR: Identificador inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El identificador debe ser un número entero mayor o igual a 0.',
                error: { status: 400, stack: 'Revisa el enlace e intenta nuevamente.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const mascota = await Mascota.findByPk(id);

        if (!mascota) {
            registrarActividad(`🌐❌ GET /mascotas/id/editar - ERROR: Mascota inexistente (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'La mascota con ese identificador no existe.',
                error: { status: 400, stack: 'Verifica el listado y reintenta.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const duenos = await Dueno.findAll({ order: [['nombre', 'ASC']] });
        const listaDuenos = duenos.map((dueno) => dueno.toJSON());

        registrarActividad(`🌐 GET /mascotas/id/editar - Formulario de edición de mascota solicitado y en proceso de carga (${req.session.usuario.email}).`);
        res.render('mascotas_update', {
            title: 'Editar Mascota | VetCare Pro',
            nombreClinica: 'VetCare Pro',
            mascota: mascota.toJSON(),
            listaDuenos
        });

    } catch (error) {
        registrarActividad(`❌ GET /mascotas/id/editar - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos editar la mascota en la BD en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

/* -------------------------------------------
 * CRUD - UPDATE
 * POST | RUTA PARA EDITAR EN LA BD UNA MASCOTA EXISTENTE (/id/editar)
 * -------------------------------------------
 * Si el usuario está autenticado, procedemos a conectarnos a PostgreSQL y realizar la edición de una mascota existente
 */
router.post('/:id/editar', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nombre, especie, raza, edad, sexo, duenoId } = req.body;

        if (!Number.isInteger(id) || id < 0) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Identificador inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El identificador debe ser un número entero mayor o igual a 0.',
                error: { status: 400, stack: 'Revisa el enlace e intenta nuevamente.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        if (!nombre || !especie || !sexo || !raza || edad === undefined || edad === '') {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Datos incompletos en el formulario (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'Debes completar todos los campos del formulario: nombre, especie, raza, edad y sexo de la mascota.',
                error: { status: 400, stack: 'Revisa el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const edadNumerica = Number(edad);
        if (!Number.isInteger(edadNumerica) || edadNumerica < 0) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Edad inválida (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'La edad debe ser un número entero mayor o igual a 0.',
                error: { status: 400, stack: 'Revisa el campo de edad en el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        if (!['Macho', 'Hembra'].includes(sexo)) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Sexo inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El sexo debe ser Macho o Hembra.',
                error: { status: 400, stack: 'Revisa el campo de sexo en el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        // --- Validación del dueño (idéntica a la de POST /crear en la Fase 6) ---
        const duenoIdNumerico = Number(duenoId);
        if (!Number.isInteger(duenoIdNumerico) || duenoIdNumerico <= 0) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Dueño inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'Debes seleccionar un dueño válido para la mascota.',
                error: { status: 400, stack: 'Revisa el formulario e intenta nuevamente' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const duenoElegido = await Dueno.findByPk(duenoIdNumerico);
        if (!duenoElegido) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Dueño inexistente (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El dueño seleccionado no existe.',
                error: { status: 400, stack: 'Verifica el listado y reintenta.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        // --- Búsqueda de la mascota a editar (mismo patrón que duenos.js) ---
        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            registrarActividad(`🌐❌ POST /mascotas/id/editar - ERROR: Mascota inexistente (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'La mascota con ese identificador no existe.',
                error: { status: 400, stack: 'Verifica el listado y reintenta.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        await mascota.update({
            duenoId: duenoIdNumerico,
            nombre: validator.escape(nombre),
            especie: validator.escape(especie),
            raza: validator.escape(raza),
            edad: edadNumerica,
            sexo,
        });

        registrarActividad(`🌐 POST /mascotas/id/editar - ÉXITO: Mascota ${nombre} editada exitosamente en la BD (${req.session.usuario.email}).`);
        res.redirect('/mascotas');

    } catch (error) {
        registrarActividad(`❌ POST /mascotas/id/editar - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos editar la mascota en la BD en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

/* -------------------------------------------
 * CRUD - DELETE
 * POST | RUTA PARA ELIMINAR DE LA BD UNA MASCOTA EXISTENTE (/id/eliminar)
 * -------------------------------------------
 * Si el usuario está autenticado, procedemos a conectarnos a PostgreSQL y realizar la eliminación de la mascota seleccionada
 */
router.post('/:id/eliminar', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 0) {
            registrarActividad(`🌐❌ POST /mascotas/id/eliminar - ERROR: Identificador inválido (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'El identificador debe ser un número entero mayor o igual a 0.',
                error: { status: 400, stack: 'Revisa el enlace e intenta nuevamente.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        const mascota = await Mascota.findByPk(id);

        if (!mascota) {
            registrarActividad(`🌐❌ POST /mascotas/id/eliminar - ERROR: Mascota inexistente (${req.session.usuario.email}).`);
            return res.status(400).render('error', {
                message: 'La mascota con ese identificador no existe.',
                error: { status: 400, stack: 'Verifica el listado y reintenta.' },
                nombreClinica: 'VetCare Pro'
            });
        }

        await mascota.destroy();

        registrarActividad(`🌐 POST /mascotas/id/eliminar - ÉXITO: Mascota eliminada exitosamente de la BD (${req.session.usuario.email}).`);
        res.redirect('/mascotas');

    } catch (error) {
        registrarActividad(`❌ POST /mascotas/id/eliminar - Error Crítico: ${error.message}`);
        res.status(500).render('error', {
            message: 'No pudimos eliminar la mascota de la BD en este momento.',
            error: { status: 500, stack: error.message },
            nombreClinica: 'VetCare Pro'
        });
    }
});

export default router;