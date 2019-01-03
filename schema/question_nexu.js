/**
 * 题目父子,用户与题目表
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('question_nexu', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // question_id	问题id
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_id',
        },
        // user_id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        // 题目状态
        question_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_status',
        },
        // 题目难度
        question_grade: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_grade'
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