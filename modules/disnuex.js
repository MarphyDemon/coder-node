const db = require('../config/db');
const Sequelize = db.sequelize;
const CommentNexu = Sequelize.import('../schema/disnuex');

CommentNexu.sync({force: false});

class CommentNexuModel {
    /**
     * 创建评论关系
     * @param data
     * @returns {Promise<*>}
     */
    static async createCommentNexu(data) {
        return await CommentNexu.create({
            parent_id: data.parent_id,
            child_id: data.child_id,
        })
    }

    /**
     * 获取评论父子关系数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getCommentNexuDetail(parent_id) {
        return await CommentNexu.findOne({
            where: {
                parent_id,
            },
        })
    }

    /**
     * 删除评论
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteCommentNexu(id) {
        await CommentNexu.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = CommentNexuModel
