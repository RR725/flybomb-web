'use strict'
var host = '',
  restapi = {
    addSubject: host + '/restapi/flybomb/subject/add',
    stockList: host + '/restapi/flybomb/stock/list',
    subjectList: host + '/restapi/flybomb/subject/list',
    addQuestion: host + '/restapi/flybomb/question/add',
    updateQuestion: host + '/restapi/flybomb/question/update',
    questionList: host + '/restapi/flybomb/question/list',
    questionListRandom: host + '/restapi/flybomb/question/list/random',
    questionFindOne: host + '/restapi/flybomb/question/find/one',
    questionRecommend: host + '/restapi/flybomb/question/recommend',
    login: host + '/restapi/flybomb/login',
    logout: host + '/restapi/flybomb/logout',
    checkLogin: host + '/restapi/flybomb/checkLogin',
  }
module.exports = restapi
