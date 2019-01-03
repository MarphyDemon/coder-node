const db = require('../config/db');
const Sequelize = db.sequelize;
const Result = Sequelize.import('../schema/result');

Result.sync({force: false});

class ResultModel {
    /**
     * 创建题目
     * @param data
     * @returns {Promise<*>}
     */
    static async createResult(data, user_id) {
        return await Result.create({
            user_id: user_id,
            question_id: data.question_id,
            result_code: data.result_code,
            result_status: data.result_status,
            is_own: data.is_own,
        })
    }

    /**
     * 更新答案数据
     * @param id  答案ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateResult(id, data) {
        await Result.update({
            result_code: data.result_code,
            result_status: data.result_status,
            is_own: data.is_own,
        }, {
            where: {
                id
            },
            fields: ['result_code', 'result_status', 'is_own']
        });
        return true
    }

    /**
     * 获取答案列表
     * @returns {Promise<*>}
     */
    static async getResultList(params) {
        let ret = null;
        let page = params.page ? params.page : 1;
        let page_size = params.page_size ? parseInt(params.page_size) : 10;
        let question_id = params.question_id ? params.question_id : '';
        let result_status = params.result_status ? params.result_status : '';
        let sort = params.sort ? params.sort : '';

        if (question_id||result_status) {
            let obj = {}
            if(question_id){obj.question_id=question_id}
            if(result_status){obj.result_status=result_status}
            ret = await Result.findAndCountAll({
                limit: page_size,//每页10条
                offset: (page - 1) * page_size,
                where: obj,
            });
        } else {
            ret = await Result.findAndCountAll({
                limit: page_size,//每页10条
                offset: (page - 1) * page_size,
            });
        }
        return {
            resultList: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: page_size,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / page_size),
            }
        }
    }

    /**
     * 获取答案详情数据
     * @param id  答案ID
     * @returns {Promise<Model>}
     */
    static async getResultDetail(user_id, question_id) {
        let obj = {}
        if(user_id){obj.user_id=user_id}
        if(question_id){obj.question_id=question_id}
        return await Result.findOne({
            where: obj
        })
    }

        /**
     * 获取答案详情数据
     * @param id  答案ID
     * @returns {Promise<Model>}
     */
    static async ResultDetail(id) {
        return await Result.findOne({
            where: {
                id
            },
        })
    }



    /**
     * 删除答案
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteResult(id) {
        await Result.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = ResultModel
