const runPy = require("../run/runpy")
// const codeModel = require('../modules/code');
const statusCode = require('../util/status-code')

class UserCode {
    /**
     * 获取上传代码
     * @param ctx
     * @returns {Promise.<void>}
     * name 用户名称  questionId文字名称    questionTitle问题序号
     * first 保存代码到数据库
     * second 新建文件执行代码  获取结果  删除文件  计算分数
     */
    static async getUserCode(ctx) {
        let data = ctx.request.body;
        let code = data.code
        let type = data.type
        let username = data.username
        let questionTitle = data.questionTitle
        let res
        if (code) {
            if(type == "python"){
                async function getStockPriceByName() {
                    return await runPy.main(
                        username,
                        questionTitle,
                        code
                    );
                }
                let res = await getStockPriceByName().then(function(result) {
                    return result;
                });
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功', res)
            }else{
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412('暂不支持其他文件')
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('执行失败')
        }
    }
}

module.exports = UserCode;