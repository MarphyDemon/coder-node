/**
 * 评论
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('commen', {
        // 评论ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // from_uid	评论用户id
        from_uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'from_uid',
        },
        // 题目Id
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'question_id',
        },
        // 评论内容
        comment_des: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'comment_des'
        },
        // 评论赞成数
        comment_pass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'comment_pass'
        },
        // 评论反对数
        comment_dis: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'comment_dis'
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