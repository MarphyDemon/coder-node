const runPy = require("../run/runpy")
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)

class Common{
    // 获取用户姓名及id
    static async getUserInfo(ctx) {
        const token = ctx.header.authorization;
        if (token) {
            let payload
            try {
                // 解密payload，获取用户名和ID
                payload = await verify(token.split(' ')[1], secret.sign)
                const user = {
                    user_id: payload.id,
                    username: payload.username,
                }
                return user
            }
            catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412('查询失败，authorization error!')
            }
        }
    }
    static async runCode(req, user){
        async function getStockPriceByName() {
            return await runPy.main(
                user.username,
                req.question_title,
                req.result_code
            );
        }
        let res = await getStockPriceByName().then(function(result) {
            return result;
        });
        return res
    }
}

module.exports = Common;

