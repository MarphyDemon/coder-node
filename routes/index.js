const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')
const CodeController = require('../controllers/code')
const fs = require('fs')

const router = new Router({
    prefix: '/api/v1'
})
var home = async (ctx,next) => {
    console.log('请求进入');
    ctx.response.type = 'text/html';
    ctx.response.body = fs.createReadStream(path.join(__dirname + '/static','html','index.html'));
};
router.get('/',home);
/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.post('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
// 更新用户信息
router.put('/user/update/:id', UserController.update);
// 上传代码执行
router.post('/user/code', CodeController.getUserCode);

/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArticleController.create);
// 获取文章详情
router.get('/article/detail/:id', ArticleController.detail);
// 删除文章
router.delete('/article/delete/:id', ArticleController.delete);
// 更改文章
router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
router.get('/article/list', ArticleController.getArticleList);

module.exports = router
