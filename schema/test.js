/**
 * 保存最后一次点击测试提交的代码
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('test', {
        // 答案ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        // 题目id
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_id',
        },
        // 题目标题
        question_title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question_title',
        },
        // 答案代码
        result_code: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'result_code'
        },
        // 答案是否正确
        result_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'result_status'
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