const ResultModel = require('../modules/result')
const statusCode = require('../util/status-code')
const Common = require("./common")

class ResultController {
    /**
     * 创建答案
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;
        let user = await Common.getUserInfo(ctx);
        if (user.user_id && req.question_id) {
            let isExist = await ResultModel.getResultDetail(user.user_id, req.question_id);
            if(isExist){
                await ResultModel.updateResult(isExist.id, req);
                let res = await ResultModel.ResultDetail(isExist.id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('提交成功！', res);
            }else{
                if (user.user_id
                    && req.question_id            
                    && req.result_code
                    && req.result_status
                    && req.is_own
                ) {
                    try {
                        const ret = await ResultModel.createResult(req, user.user_id);
                        const data = await ResultModel.ResultDetail(ret.id);
                        ctx.response.status = 200;
                        ctx.body = statusCode.SUCCESS_200('提交成功', data);
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
     * 获取答案列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getResultList(ctx) {
        let params = ctx.query;
        try {
            const data = await ResultModel.getResultList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询答案列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条答案数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let user = await Common.getUserInfo(ctx);
        let question_id = ctx.request.body.id;
        if (user.user_id && question_id) {
            try {
                let data = await ResultModel.getResultDetail(user.user_id, question_id);
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
                await ResultModel.deleteResult(id);
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
            ctx.body = statusCode.ERROR_412('答案ID必须传！');
        }
    }

    /**
     * 更新答案数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        if (req) {
            await ResultModel.updateResult(req.id, req);
            let data = await ResultModel.ResultDetail(req.id);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('提交成功！', data);
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('提交失败！')
        }
    }
}

module.exports = ResultController
