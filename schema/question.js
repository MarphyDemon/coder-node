/**
 * 题目
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('question', {
        // 题目ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // 题目标题
        question_title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_title',
        },
        // 题目详细内容
        question_des: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'question_des'
        },
        // 题目实例
        question_example: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_example'
        },
        // 题目作者
        question_author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_author'
        },
        // 题目难度
        question_grade: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_grade'
        },
        // 题目模版
        question_templete: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_templete'
        },
        // 题目通过数
        question_pass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_pass',
            defaultValue: 0
        },
        // 挑战总次数
        question_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_count',
            defaultValue: 0
        },
        // 题目状态
        question_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_status',
        },
        // 题目状态
        question_right_code: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_right_code',
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
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}