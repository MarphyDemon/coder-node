/**
 * 评论父子关系表
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('disnuex', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // parent_id	评论用户id
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'parent_id',
        },
        // child_id
        child_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'child_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true
    })

}