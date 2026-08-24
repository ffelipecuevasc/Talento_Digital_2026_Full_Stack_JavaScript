// models/mascota.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

class Mascota extends Model {}

Mascota.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        duenoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'dueno_id',
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        especie: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        raza: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sexo: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'fecha_ingreso',
            defaultValue: sequelize.literal('CURRENT_DATE'),
        },
    },
    {
        sequelize,
        modelName: 'Mascota',
        tableName: 'mascotas',
        timestamps: false,
    }
);

export default Mascota;