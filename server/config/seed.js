/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Genre = require('../api/genre/genre.model');

/*
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
*/

Genre.find({}).remove(function() {
  Genre.create(
    {name: 'アクション'},
    {name: '対戦アクション'},
    {name: '格闘'},
    {name: 'クライムアクション'},
    {name: 'ステルス'},
    {name: 'ドットイート'},
    {name: 'ベルトスクロールアクション'},
    {name: 'プラットフォーム'},

    {name: 'RPG'},
    {name: 'MORPG'},
    {name: 'MMORPG'},
    {name: 'ハックアンドスラッシュ'},
    {name: 'ローグライク'},

    {name: 'パズル'},
    {name: 'アクションパズル'},
    {name: '落ち物パズル'},
    {name: 'お絵描きロジック'},

    {name: 'シミュレーション'},
    {name: '育成'},
    {name: 'ウォー・シミュレーション'},
    {name: '音楽'},
    {name: '経営'},
    {name: 'タワーディフェンス'},
    {name: 'ターン制ストラテジー'},
    {name: 'フライト'},
    {name: 'ドライビング'},
    {name: '鉄道'},
    {name: 'ミニスケープ'},
    {name: 'リアルタイムストラテジー'},
    {name: '歴史'},
    {name: '職業'},

    {name: 'アドベンチャー'},
    {name: 'サウンドノベル'},
    {name: 'ビジュアルノベル'},
    {name: 'インタラクティブフィクション'},
    {name: '脱出ゲーム'},
    {name: 'サバイバルホラー'},

    {name: 'シューティング'},
    {name: 'ガンシューティング'},
    {name: 'MMOFPS'},
    {name: 'FPS'},
    {name: 'サードパーソン'},
    {name: 'フライトシューティング'},

    {name: 'レース'},
    {name: 'スポーツ'},

    {name: 'キャラクター'},
    {name: 'シネマ'},
    {name: 'タレント'},
    {name: '恋愛ゲーム'},
    {name: '美少女ゲーム'},
    {name: 'ギャルゲー'},
    {name: '女性向け'},
    {name: 'ボーイズラブ'},
    {name: '乙女ゲー'},

    {name: 'アダルト'},
    {name: '泣きゲー'},
    {name: '鬱ゲー'},
    {name: '残酷ゲーム'},

    {name: 'クイズ'},
    {name: 'シリアス'},
    {name: '体感'},
    {name: 'タイピング'},
    {name: 'テーブルゲーム'},
    {name: 'パーティゲーム'},
    {name: 'ホラー'},
    {name: 'オープンワールド'},
    {name: 'ボードゲーム'},
    {name: 'ミニゲーム'},
    {name: 'レトロ'},

    {name: 'アーケード'},
    {name: 'トレーディングカードゲーム'},
    {name: 'メダルゲーム'},
    {name: 'ブラウザゲーム'},
    {name: 'オンラインゲーム'},
    {name: 'ソーシャルゲーム'},
    {name: '同人ゲーム'},
    {name: '謎解き'},
    {name: 'コレクション'},
    {name: '放置ゲー'},
    {name: 'クソゲー'},
    function() {
      console.log('finished populating genres');
    }
  );
});
