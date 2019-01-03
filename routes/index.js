const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')
// const CodeController = require('../controllers/code')
const QuestionController = require('../controllers/question')
const TestCodeController = require('../controllers/test_code')
const ResultController = require('../controllers/result')

const router = new Router({
    prefix: '/api/v1'
})

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
// 根据id查询用户
router.post('/user/creater', UserController.getUserInfoById);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
// 更新用户信息
router.post('/user/update', UserController.update);


// 上传代码执行
// router.post('/user/code', CodeController.getUserCode);

/**
 * 题目接口
 */
router.post('/question/create', QuestionController.create);
router.get('/question/list', QuestionController.getQesutionList);
router.post('/question/detail', QuestionController.detail);
router.delete('/question/delete/:id', QuestionController.delete);
router.post('/question/update', QuestionController.update);

/**
 * result 提交答案接口
 */
router.post('/result/create', ResultController.create);
router.get('/result/list', ResultController.getResultList);
router.post('/result/detail', ResultController.detail);
router.delete('/result/delete/:id', ResultController.delete);
router.post('/result/update', ResultController.update);


/**
 * test-code 测试代码接口
 */
router.post('/test/code/create', TestCodeController.create);
router.post('/test/code/detail', TestCodeController.detail);
router.delete('/test/code/delete/:id', TestCodeController.delete);


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
