# 全APIリスト

  - [GET /api/games](https://github.com/hirokoma/gaq-server#get-apigames) ：ゲーム一覧の取得
  - [POST /api/users](https://github.com/hirokoma/gaq-server#post-apiusers) ：ユーザーの作成
  - [PUT /api/users](https://github.com/hirokoma/gaq-server#put-apiusers) ：自身のユーザー情報の変更
  - [GET /api/users/me](https://github.com/hirokoma/gaq-server#get-apiusersme) ：自身のユーザー情報の閲覧
  - [POST /api/questions](https://github.com/hirokoma/gaq-server#post-apiquestions) ：質問の作成
  - [GET /api/questions](https://github.com/hirokoma/gaq-server#get-apiquestions) ：質問一覧の取得
  - [POST /api/answers](https://github.com/hirokoma/gaq-server#post-apianswers) ：回答の作成
  - [GET /api/answers](https://github.com/hirokoma/gaq-server#get-apianswers) ：回答一覧の取得
  - [PUT /api/answers/best](https://github.com/hirokoma/gaq-server#put-apianswersbest) ：ベストアンサーの決定
  - [POST /api/comments](https://github.com/hirokoma/gaq-server#post-apicomments) ：コメントの作成
  - [GET /api/comments](https://github.com/hirokoma/gaq-server#get-apicomments) ：コメント一覧の取得
  - [POST /api/likes](https://github.com/hirokoma/gaq-server#post-apilikes) ：「いいね」する
  - [POST /api/reports](https://github.com/hirokoma/gaq-server#post-apireports) ：通報する


# GET /api/games
##### ゲームの一覧を取得する
  - 認証: 不要

  - リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| title | 任意 | 検索キーワード. このキーワードを含むタイトルをもつゲームを取得する.|
| count | 任意 | 取得件数. 1〜100の数値で指定する. デフォルトでは10. |

  - リクエスト例

~~~
/api/games?title=ねこ&count=1
~~~

  - レスポンス例

~~~json
{
  "games":[
    {
      "id": "55c8af859165eede62848b3c",
      "title": "ねこあつめ",
      "genres": [
        "コレクション","放置ゲー",
      ]
    }
  ]
}
~~~
___

# POST /api/users
##### ユーザーを新規に作成する

- 認証: 不要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| name | 必須 | ユーザーの名前. |
| game_id | 任意 | ゲームIDを指定することで, ユーザーの得意なゲームを指定できる. カンマ区切りで複数指定できる.|

- リクエスト例

~~~json
/api/users
~~~
~~~json
"body": {
  "name": "こまさん",
  "game_id": "55c8af859165eede62848b3c,55c8af859165eede62848b3d"
}
~~~

- レスポンス例

~~~json
{
  "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWQ0NWQwOWRhZjQ2MmU4NGU1MjIwMGQiLCJpYXQiOjE0Mzk5ODA4MDk0MzAsImV4cCI6NDU5MzU4MDgwOTQzMH0.v6w3swFIw98HXLMJW90qR7UvHqo2aWnrn822fnj-c_T"
}
~~~
___

# PUT /api/users
##### 自身のユーザー情報に変更を加える

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| name | 任意 | ユーザーの名前. |
| game_id | 任意 | ゲームIDを指定することで, ユーザーの得意なゲームを指定できる. カンマ区切りで複数指定できる. |

- リクエスト例

~~~json
/api/users
~~~
~~~json
"body": {
  "name": "こまちん",
  "game_id": "55c8af859165eede62848b3c"
}
~~~

- レスポンス例

~~~json
{
  "user": {
    "id": "55d45d09daf462e84e52200d",
    "name": "こまちん",
    "games": [
      {
        "id": "55c8af859165eede62848b3c",
        "title": "ねこあつめ",
        "genres": [
          "コレクション", "放置ゲー"
        ]
      }
    ]
  }
}
~~~
___

# GET /api/users/me
##### 自身のユーザー情報を取得する

- 認証: 必要

- リクエストパラメータ

| パラメータ |
|:------|
| なし |


- リクエスト例

~~~json
/api/users/me
~~~

- レスポンス例

~~~json
{
  "user": {
    "id": "55d45d09daf462e84e52200d",
    "name": "こまちん",
    "games": [
      {
        "id": "55c8af859165eede62848b3c",
        "title": "ねこあつめ",
        "genres": [
          "コレクション", "放置ゲー"
        ]
      }
    ]
  }
}
~~~
___

# POST /api/questions
##### 質問を新規に作成する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| game_id | 必須 | ゲームIDを指定することで, どのゲームに対する質問かを指定する. 複数のゲームIDを指定することはできない.|
| title | 必須 | 質問のタイトル.|
| text | 必須 | 質問の本文.|


- リクエスト例

~~~json
/api/questions
~~~
~~~json
"body": {
  "game_id": "55c8af859165eede62848b3c",
  "title": "まんぞくさんの出現条件",
  "text": "まんぞくさんにエサを食い荒らされて困ってます。どうすれば出現しなくなりますか？",
}
~~~

- レスポンス例

~~~json
{
  "question": {
    "id": "55d4a214daf462e84e52200e",
    "title": "まんぞくさんの出現条件",
    "text": "まんぞくさんにエサを食い荒らされて困ってます。どうすれば出現しなくなりますか？",
    "answerCount": 0,
    "commentCount": 0,
    "reportCount": 0,
    "recentComments": [],
    "bestAnswer": null,
    "time": "2015-08-20-00-34-44",
    "game": {
      "id": "55c8af859165eede62848b3c",
      "title": "ねこあつめ"
    },
    "user": {
      "id": "55d45d09daf462e84e52200d",
      "name": "こまちん"
    }
  }
}
~~~
___

# GET /api/questions
##### 質問の一覧を取得する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| count | 任意 | 取得件数. 1〜100の数値で指定する. デフォルトでは10. |
| until_id | 任意 | 質問IDを指定することで, その質問より過去の質問のみを取得できる.|
| game_id | 任意 | ゲームIDを指定することで, そのゲームに対する質問のみを取得できる. 複数のゲームIDを指定することはできない.|
| unanswered | 任意 | true を指定することで, 未回答の質問のみを取得できる.|


- リクエスト例

~~~json
/api/questions?count=3&game_id=55c8af859165eede62848b3c&unanswered=true
~~~
- レスポンス例

~~~json
{
  "questions": [
    {
      "id": "55d4a214daf462e84e52200e",
      "title": "まんぞくさんの出現条件",
      "text": "まんぞくさんにエサを食い荒らされて困ってます。どうすれば出現しなくなりますか？",
      "answerCount": 0,
      "commentCount": 2,
      "reportCount": 0,
      "bestAnswer": null,
      "time": "2015-08-20-00-34-44",
      "game": {
        "id": "55c8af859165eede62848b3c",
        "title": "ねこあつめ",
        "genres": [
          "コレクション", "放置ゲー"
        ]
      },
      "user": {
        "id": "55d45d09daf462e84e52200d",
        "name": "こまちん"
      },
      "recentComments": [
        {
          "id": "55d6a122daf462e84e522010",
          "text": "ちなみに、すべてのエサを試しましたが、すべて食い荒らされます。",
          "time": "2015-08-20-01-29-15",
          "user": {
            "id": "55d45d09daf462e84e52200d",
            "name": "こまちん"
          }
        }, {
          "id": "55d6a151daf462e84e522011",
          "text": "また、庭先拡張はまだ行っていません。",
          "time": "2015-08-20-01-30-01",
          "user": {
            "id": "55d45d09daf462e84e52200d",
            "name": "こまちん"
          }
        }
      ]
    }, {
      "id": "55d4a214daf462e84e52200f",
      "title": "ねこ缶のコスパ",
      "text": "ねこ缶は高い割に、にぼし回収率が高級かりかりより低い気がします。ねこ缶のメリットを教えてください。",
      "answerCount": 0,
      "commentCount": 0,
      "reportCount": 0,
      "bestAnswer": null,
      "time": "2015-08-20-07-30-41",
      "game": {
        "id": "55c8af859165eede62848b3c",
        "title": "ねこあつめ",
        "genres": [
          "コレクション", "放置ゲー"
        ]
      },
      "user": {
        "id": "55d45d09daf462e84e52200e",
        "name": "じばにゃん"
      }
    }, {
      "id": "55d4a214daf462e84e52200a",
      "title": "びすとろさんの出現アイテム",
      "text": "びすとろさんって、ストーブ以外でも来ますか？",
      "answerCount": 0,
      "commentCount": 0,
      "reportCount": 0,
      "bestAnswer": null,
      "time": "2015-08-20-11-30-41",
      "game": {
        "id": "55c8af859165eede62848b3c",
        "title": "ねこあつめ",
        "genres": [
          "コレクション", "放置ゲー"
        ]
      },
      "user": {
        "id": "55d45d09daf462e84e52200a",
        "name": "こまじろう"
      }
    }
  ]
}
~~~
___


# POST /api/answers
##### 回答を新規に作成する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| question_id | 必須 | 質問IDを指定することで, どの質問に対する回答かを指定する. 複数の質問IDを指定することはできない.|
| text | 必須 | 回答の本文.|


- リクエスト例

~~~json
/api/questions
~~~
~~~json
"body": {
  "question_id": "55d4a214daf462e84e52200e",
  "text": "まんぞくさんは、屋外に置かれている全てのエサを食べます。一方、屋内のエサには寄り付きません。",
}
~~~

- レスポンス例

~~~json
{
  "answer": {
    "id": "55d6a3f5daf462e84e522014",
    "text": "まんぞくさんは、屋外に置かれている全てのエサを食べます。一方、屋内のエサには寄り付きません。",
    "commentCount": 0,
    "likeCount": 0,
    "reportCount": 0,
    "recentComments": [],
    "isBest": false,
    "time": "2015-08-20-12-35-16",
    "user": {
      "id": "55d6a3a7daf462e84e522013",
      "name": "ぴかちゅう"
    }
  }
}
~~~
___

# GET /api/answers
##### 回答の一覧を取得する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| question_id | 必須 | 質問IDを指定することで, その質問に対する回答のみを取得する. 複数の質問IDを指定することはできない.|
| count | 任意 | 取得件数. 1〜100の数値で指定する. デフォルトでは10. |
| until_id | 任意 | 回答IDを指定することで, その回答より過去の回答のみを取得できる.|

- リクエスト例

~~~json
/api/answers?question_id=55d4a214daf462e84e52200e&count=2
~~~
- レスポンス例

~~~json
{
  "answers": [
    {
      "id": "55d6a4b2daf462e84e522016",
      "text": "庭先拡張して屋内にエサをおくと良いですよ。",
      "commentCount": 0,
      "likeCount": 0,
      "reportCount": 0,
      "isBest": false,
      "time": "2015-08-21-13-10-26",
      "user": {
        "id": "55d6a485daf462e84e522015",
        "name": "ぐんまちゃん"
      },
      "recentComments": []
    }, {
      "id": "55d6a3f5daf462e84e522014",
      "text": "まんぞくさんは、屋外に置かれている全てのエサを食べます。一方、屋内のエサには寄り付きません。",
      "commentCount": 1,
      "likeCount": 0,
      "reportCount": 0,
      "isBest": false,
      "time": "2015-08-21-13-07-17",
      "user": {
        "id": "55d6a3a7daf462e84e522013",
        "name": "ぴかちゅう"
      },
      "recentComments": [
        {
          "id": "55d6a62ddaf462e84e522017",
          "text": "ちなみに、屋内と屋外の境界は公式サイトで公開されている",
          "time": "2015-08-21-15-00-20",
          "user": {
            "id": "55d6a485daf462e84e522015",
            "name": "ぐんまちゃん"
          }
        }
      ]
    }
  ]
}
~~~
___

# PUT /api/answers/best
##### 指定した回答をベストアンサーにする

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| answer_id | 必須 | 回答IDを指定することで, その回答をベストアンサーに指定する. 既に他の回答がベストアンサーとして選ばれている場合, このアクションは失敗する. |

- リクエスト例

~~~json
/api/users
~~~
~~~json
"body": {
  "game_id": "55d6a3f5daf462e84e522014"
}
~~~


- レスポンス例

~~~json
{
  "answer": {
    "id": "55d6a3f5daf462e84e522014",
    "text": "まんぞくさんは、屋外に置かれている全てのエサを食べます。一方、屋内のエサには寄り付きません。",
    "commentCount": 0,
    "likeCount": 0,
    "reportCount": 0,
    "recentComments": [],
    "isBest": true,
    "time": "2015-08-20-12-35-16",
    "user": {
      "id": "55d6a3a7daf462e84e522013",
      "name": "ぴかちゅう"
    }
  }
}
~~~
___

# POST /api/comments
##### コメントを新規に作成する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| question_id | どちらかのみ必須 | 質問IDを指定することで, どの質問に対するコメントかを指定できる. 複数の質問IDを指定することはできない.|
| answer_id | どちらかのみ必須 | 回答IDを指定することで, どの回答に対するコメントかを指定できる. 複数の回答IDを指定することはできない.|
| text | 必須 | コメントの本文.|


- リクエスト例

~~~json
/api/comments
~~~
~~~json
"body": {
  "question_id": "55d4a214daf462e84e52200e",
  "text": "ちなみに、すべてのエサを試しましたが、すべて食い荒らされます。",
}
~~~

- レスポンス例

~~~json
{
  "comment": {
    "id": "55d6bddb557dd2513aa79cb9",
    "text": "ちなみに、すべてのエサを試しましたが、すべて食い荒らされます。",
    "reportCount": 0,
    "time": "2015-08-21-15-14-56",
    "user": {
      "id": "55d45d09daf462e84e52200d",
      "name": "こまっち"
    }
  }
}
~~~
___

# GET /api/comments
##### コメントの一覧を取得する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| question_id | どちらかのみ必須 | 質問IDを指定することで, その質問に対するコメントのみを取得する. 複数の質問IDを指定することはできない.|
| answer_id | どちらかのみ必須 | 回答IDを指定することで, その回答に対するコメントのみを取得する. 複数の回答IDを指定することはできない.|
| count | 任意 | 取得件数. 1〜100の数値で指定する. デフォルトでは10. |
| until_id | 任意 | コメントIDを指定することで, そのコメントより過去のコメントのみを取得できる.|

- リクエスト例

~~~json
/api/comments?question_id=55d4a214daf462e84e52200e&count=5
~~~
- レスポンス例

~~~json
{
  "comments": [
    {
      "id": "55d6a151daf462e84e522011",
      "text": "また、庭先拡張はまだ行っていません。",
      "reportCount": 0,
      "time": "2015-08-21-12-56-01",
      "user": {
        "id": "55d699b0daf462e84e52200f",
        "name": "こまっち"
      }
    }, {
      "id": "55d6a122daf462e84e522010",
      "text": "ちなみに、すべてのエサを試しましたが、すべて食い荒らされます。",
      "reportCount": 0,
      "time": "2015-08-21-12-55-14",
      "user": {
        "id": "55d699b0daf462e84e52200f",
        "name": "こまっち"
      }
    }
  ]
}
~~~
___

# POST /api/likes
##### 指定した回答に「いいね」する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| answer_id | 必須 | 回答IDを指定することで, どの回答に対する「いいね」かを指定できる. 複数の回答IDを指定することはできない.|

- リクエスト例

~~~json
/api/likes
~~~
~~~json
"body": {
  "answer_id": "55d6a4b2daf462e84e522016"
}
~~~

- レスポンス例

~~~json
{
  "like": {
    "id": "55d6c07b557dd2513aa79cba",
    "time": "2015-08-20-01-51-04",
    "answer": {
      "id": "55d6a4b2daf462e84e522016"
    },
    "user": {
      "id": "55d6bdbe557dd2513aa79cb8",
      "name": "こまさぶろう"
    }
  }
}
~~~
___

# POST /api/reports
##### 質問, 回答, コメントを通報する

- 認証: 必要

- リクエストパラメータ

| パラメータ | 要否 | 説明 |
|:------|:---|:---|
| question_id | どれかのみ必須 | 質問IDを指定することで, どの質問を通報するのかを指定できる. 複数の質問IDを指定することはできない.|
| answer_id | どれかのみ必須 | 回答IDを指定することで, どの回答を通報するのかを指定できる. 複数の回答IDを指定することはできない.|
| comment_id | どれかのみ必須 | コメントIDを指定することで, どのコメントを通報するのかを指定できる. 複数のコメントIDを指定することはできない.|
| text | 必須 | 通報理由. |

- リクエスト例

~~~json
/api/reports
~~~
~~~json
"body": {
  "answer_id": "55d6a4b2daf462e84e522016",
  "text": "不適切な用語の使用"
}
~~~

- レスポンス例

~~~json
{
  "report": {
    "id": "55d6c215557dd2513aa79cbb",
    "time": "2015-08-20-01-10-00",
    "answer": {
      "id": "55d6a4b2daf462e84e522016"
    },
    "user": {
      "id": "55d6bdbe557dd2513aa79cb8",
      "name": "こまさぶろう"
    }
  }
}
~~~
___
