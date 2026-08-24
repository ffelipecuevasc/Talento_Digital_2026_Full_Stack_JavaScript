// models/associations.js
import Dueno from './dueno.js';
import Mascota from './mascota.js';

// "Un dueño tiene muchas mascotas"
Dueno.hasMany(Mascota, {
    foreignKey: 'duenoId',
    as: 'mascotas',
});

// "Una mascota pertenece a un único dueño" (la cara inversa de la misma relación)
Mascota.belongsTo(Dueno, {
    foreignKey: 'duenoId',
    as: 'dueno',
});