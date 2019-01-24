const db = require('../config/db');
const Sequelize = db.sequelize;
const Question = Sequelize.import('../schema/question');

Question.sync({force: false});

class QuestionModel {
    /**
     * 创建题目
     * @param data
     * @returns {Promise<*>}
     */
    static async createQuestion(data, user_id) {
        return await Question.create({
            question_title: data.question_title,
            question_des: data.question_des,
            question_example: data.question_example,
            question_templete: data.question_templete,
            question_author: user_id,
            question_grade: data.question_grade,
            question_pass: data.question_pass||0,
            question_count: data.question_count||0,
            question_status: data.question_status||0,
            question_right_code: data.question_right_code
        })
    }

    /**
     * 更新题目数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateQuestion(id, data) {
        await Question.update({
            question_title: data.question_title,
            question_des: data.question_des,
            question_example: data.question_example,
            question_templete: data.question_templete,
            question_grade: data.question_grade,
            question_pass: data.question_pass,
            question_count: data.question_count,
            question_status: data.question_status,
            question_right_code: data.question_right_code
        }, {
            where: {
                id
            },
            fields: ['question_title', 'question_des', 'question_example', 'question_templete', 'question_grade', 'question_pass', 'question_count', 'question_status','question_right_code']
        });
        return true
    }

    /**
     * 获取题目列表
     * @returns {Promise<*>}
     */
    static async getQuestionList(params) {
        let ret = null;
        let page = params.page ? params.page : 1;
        let page_size = params.page_size ? parseInt(params.page_size) : 10;
        let question_grade = params.question_grade ? params.question_grade : '';
        let question_status = params.question_status ? params.question_status : '';
        let question_author = params.question_author ? params.question_author : '';

        let sort = params.sort ? params.sort : '';
        if (question_grade||question_status||question_author) {
            let obj = {}
            if(question_grade){obj.question_grade=question_grade}
            if(question_status){obj.question_status=question_status}
            if(question_author){obj.question_author=question_author}
            ret = await Question.findAndCountAll({
                limit: page_size,//每页10条
                offset: (page - 1) * page_size,
                where: obj,
            });

        } else {
            ret = await Question.findAndCountAll({
                limit: page_size,//每页10条
                offset: (page - 1) * page_size,
            });
        }
        return {
            questionList: ret.rows,
            meta: {
                current_page: parseInt(page),
                page_size: page_size,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / page_size),
            }
        }
    }

    /**
     * 获取题目详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getQuestionDetail(id) {
        return await Question.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 删除题目
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteQuestion(id) {
        await Question.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = QuestionModel
