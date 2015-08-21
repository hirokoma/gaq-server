'use strict';

module.exports.messages = {
  answerUpdateBest: {
    '001': {
      message: '指定した回答はベストアンサーに選ぶことができません。',
      tips: '指定した回答に関連する質問がベストアンサーの受付を既に終了しているか、既に削除されている可能性があります。'
    },
    '002': {
      message: '指定した回答はベストアンサーに選ぶことができません。',
      tips: '指定した回答が既にベストアンサーとして選ばれているか、既に削除されている可能性があります。'
    }
  }

};

/*
200 OK 成功
201 Created 新しいリソースの生成が成功しました
202 Accepted リクエストが正常に受け付けられました
400 Bad Request リクエストデータに不正値があります
401 Unauthorized OAuth による認可が失敗しています
404 Not Found リソースが存在しません
405 Method Not Allowed メソッドが許可されていません
500 Internal Server Error API 側の問題による失敗です
503 Service Unavailable 一時的に API アクセスが出来ません
*/
