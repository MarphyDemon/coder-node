const db = require('../config/db');
const Sequelize = db.sequelize;
const TestCode = Sequelize.import('../schema/test');

TestCode.sync({force: false});

class TestCodeModel {
    /**
     * 创建测试答案
     * @param data
     * @returns {Promise<*>}
     */
    static async createTestCode(data, user_id,resultStatus) {
        return await TestCode.create({
            user_id: user_id,
            question_id: data.question_id,
            question_title: data.question_title,
            result_code: data.result_code,
            result_status: resultStatus,
        })
    }

    /**
     * 更新测试答案
     * @param id  答案ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateTestCode(id, data, resultStatus) {
        await TestCode.update({
            result_code: data.result_code,
            result_status: resultStatus
        }, {
            where: {
                id
            },
            fields: ['result_code', 'result_status']
        });
        return true
    }

    /**
     * 获取测试答案详情数据
     * @param id  答案ID
     * @returns {Promise<Model>}
     */
    static async getTestCodeDetail(user_id, question_id) {
        let obj = {}
        if(user_id){obj.user_id=user_id}
        if(question_id){obj.question_id=question_id}
        return await TestCode.findOne({
            where: obj,
        })
    }

    /**
     * 获取测试答案详情数据
     * @param id  答案ID
     * @returns {Promise<Model>}
     */
    static async TestCodeDetail(id) {
        return await TestCode.findOne({
            where: {
                id
            },
        })
    }

    /**
     * 删除测试答案
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteTestCode(id) {
        await TestCode.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = TestCodeModel
