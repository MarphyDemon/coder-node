const TestCodeModal = require('../modules/test_code')
const statusCode = require('../util/status-code')
const Common = require("./common")

class TestCodeController {
    /**
     * 创建答案
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;
        let user = await Common.getUserInfo(ctx);
        let resBack,res;
        if (user.user_id && req.question_id) {
            let isExist = await TestCodeModal.getTestCodeDetail(user.user_id, req.question_id);
            if(isExist){
                resBack = await Common.runCode(req, user);
                let resultStatus = resBack.err?0:1;
                await TestCodeModal.updateTestCode(isExist.id, req, resultStatus);
                res = await TestCodeModal.TestCodeDetail(isExist.id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('提交成功！', {runRes:resBack,saveRes:res});
            }else{
                if (user.user_id
                    && req.question_id
                    && req.question_title            
                    && req.result_code
                ) {
                    try {
                        let resBack = await Common.runCode(req, user);
                        let resultStatus = resBack.err?0:1;
                        const createRes = await TestCodeModal.createTestCode(req, user.user_id,resultStatus);
                        res = await TestCodeModal.TestCodeDetail(createRes.id);
                        ctx.response.status = 200;
                        ctx.body = statusCode.SUCCESS_200('执行成功', {runRes:resBack,saveRes:res});
                    } catch (err) {
                        ctx.response.status = 412;
                        ctx.body = statusCode.ERROR_412({
                            msg: '提交失败',
                            err,
                        })
                    }
                } else {
                    ctx.response.status = 412;
                    ctx.body = statusCode.ERROR_412({
                        msg: '请检查参数！'
                    })
                }
            }
        }
    }

    /**
     * 查询单条答案数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let user = await Common.getUserInfo(ctx);
        let question_id = ctx.request.body.question_id;
        if (user.user_id&&question_id) {
            try {
                let data = await TestCodeModal.getTestCodeDetail(user.user_id, question_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', {
                    data
                });

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    mgs: '查询失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('答案ID必须传');
        }
    }


    /**
     * 删除答案数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            try {
                await TestCodeModal.deleteTestCode(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除答案成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传！');
        }
    }
}

module.exports = TestCodeController
