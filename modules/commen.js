const db = require('../config/db');
const Sequelize = db.sequelize;
const Commen = Sequelize.import('../schema/commen');

Commen.sync({force: false});

class CommenModel {
    /**
     * 创建评论
     * @param data
     * @returns {Promise<*>}
     */
    static async createCommen(data) {
        return await Commen.create({
            from_uid: data.from_uid,
            question_id: data.question_id,
            comment_des: data.comment_des,
            comment_pass: data.comment_pass,
            comment_dis: data.comment_dis,
        })
    }

    /**
     * 更新评论数据
     * @param id  评论ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateCommen(id, data) {
        await Commen.update({
            from_uid: data.from_uid,
            comment_des: data.comment_des,
            comment_pass: data.comment_pass,
            comment_dis: data.comment_dis,
        }, {
            where: {
                id
            },
            fields: ['from_uid', 'comment_des', 'comment_pass', 'comment_dis']
        });
        return true
    }

    /**
     * 获取评论列表
     * @returns {Promise<*>}
     */
    static async getCommenList(params) {
        let ret = null;
        let page = params.page ? params.page : 1;
        let question_id = params.question_id ? params.question_id : '';
        let sort = params.sort ? params.sort : '';

        if (question_id) {
            ret = await Commen.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    question_id: question_id,
                },
            });

        } else {
            ret = await Commen.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
            });
        }
        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
    }

    /**
     * 获取评论详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getCommenDetail(id) {
        return await Commen.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 删除评论
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteCommen(id) {
        await Commen.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = CommenModel
