const statusCode = require('../util/status-code')

class AllApiController {
    /**
     * 获取所有接口数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getAllApiList(ctx) {
        try {
            const data = {
                apiList: [
                    {
                        apiFunction: "getUserListData",
                        apiStr: "/api/v1/user/list",
                        methods: "get",
                    },
                    {
                        apiFunction: "getUserInfoData",
                        apiStr: "/api/v1/user/info",
                        methods: "post",
                    }
                ]
            }
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询接口列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }
}

module.exports = AllApiController
