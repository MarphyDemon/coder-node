const Sequelize = require('sequelize');
const sequelize = new Sequelize('Marphy', 'Marphy', '950817', {
    host: '47.101.165.18',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00', //东八时区
    // logging: function(val){
    //     console.log(val)
    // },
    // logging: function(sql) {
    //     // logger为log4js的Logger实例
    //             Logger.info(sql);
    // }        
});

// var sequelize = new Sequelize('postgres://root:950817@http://47.101.165.18:3306/Marphy');
// console.log(sequelize,"sql")
module.exports = {
    sequelize
}
