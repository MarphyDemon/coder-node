const QuestionModel = require('../modules/question')
const statusCode = require('../util/status-code')
const Common = require("./common")

class QuestionController {
    /**
     * 创建题目
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;
        let user = await Common.getUserInfo(ctx);
        if (req.question_title
            && req.question_des            
            && req.question_example //"[{intput: 123,output:234},{intput: 123,output:234}]"
            && req.question_templete
            && user.user_id
            && req.question_grade
            && req.question_pass
            && req.question_count
            && req.question_status
        ) {
            try {
                const ret = await QuestionModel.createQuestion(req, user.user_id);
                const data = await QuestionModel.getQuestionDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建题目成功', data);
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建失败',
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

    /**
     * 获取题目列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getQesutionList(ctx) {
        let params = ctx.query;
        try {
            const data = await QuestionModel.getQuestionList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('获取题目列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条题目数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.request.body.id;
        if (id) {
            try {
                let data = await QuestionModel.getQuestionDetail(id);
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
            ctx.body = statusCode.ERROR_412('题目ID必须传');
        }
    }


    /**
     * 删除题目数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            try {
                await QuestionModel.deleteQuestion(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除题目成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('题目ID必须传！');
        }
    }

    /**
     * 更新题目数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        if (req) {
            await QuestionModel.updateQuestion(req.id, req);
            let data = await QuestionModel.getQuestionDetail(req.id);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新文章成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新文章失败！')
        }
    }
}

module.exports = QuestionController
