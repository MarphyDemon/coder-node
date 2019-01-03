const runPy = require("../run/runpy")
// const codeModel = require('../modules/code');
const statusCode = require('../util/status-code')

class UserCode {
    /**
     * 获取上传代码
     * @param ctx
     * @returns {Promise.<void>}
     * name 用户名称  questionId文字名称    questionTitle问题序号   代码类型
     * first 保存代码到数据库
     * second 根据用户名称新建路径新建文件执行代码  获取结果  删除文件  计算分数
     */
    static async getUserCode(ctx) {
        let data = ctx.request.body;
        let code = data.code
        let type = data.type
        let questionTitle = data.questionTitle
        const token = ctx.header.authorization;
        if (token) {
            let payload
            try {
                // 解密payload，获取用户名和ID
                payload = await verify(token.split(' ')[1], secret.sign)
                const user = {
                    id: payload.id,
                    username: payload.username,
                }
                if (code) {
                    if(type == "python"){
                        async function getStockPriceByName() {
                            return await runPy.main(
                                user.username,
                                questionTitle,
                                code
                            );
                        }
                        let res = await getStockPriceByName().then(function(result) {
                            return result;
                        });
                        setTimeout(() => {
                            ctx.response.status = 200;
                            ctx.body = statusCode.SUCCESS_200('执行成功', res);
                        }, 1000);
                    }else{
                        ctx.response.status = 412;
                        ctx.body = statusCode.ERROR_412('暂不支持其他文件')
                    }
                } else {
                    ctx.response.status = 412;
                    ctx.body = statusCode.ERROR_412('执行失败')
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412('查询失败，authorization error!')
            }
        }
    }
}

module.exports = UserCode;