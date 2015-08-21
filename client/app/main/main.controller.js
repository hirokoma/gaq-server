'use strict';

angular.module('gaqApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {

    var me = Auth.getCurrentUser();

    $scope.getApiGamesParams = {
      title: 'ねこ',
      count: 10
    }
    $scope.getApiGames = function(){
      var req = {
        method: 'GET',
        url: '/api/games?'
          + ( $scope.getApiGamesParams.title ? '&title=' + $scope.getApiGamesParams.title: '' )
          + ( $scope.getApiGamesParams.count ? '&count=' + $scope.getApiGamesParams.count: '' )
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiUsersParams = {
      name: 'こまちん',
      game_id: '',
    }
    $scope.postApiUsers = function(){
      $http.post('/api/users', {
        name: $scope.postApiUsersParams.name,
        game_id: $scope.postApiUsersParams.game_id
      })
      .success(function(res){
        console.log(res);
      });
    };

    $scope.putApiUsersParams = {
      auth_token: '',
      name: 'こまっち',
      game_id: '',
    }
    $scope.putApiUsers = function(){
      var req = {
        method: 'PUT',
        url: '/api/users',
        headers: {
         'Authorization': 'Bearer ' + $scope.putApiUsersParams.auth_token
        },
        data: {
          name: $scope.putApiUsersParams.name,
          game_id: $scope.putApiUsersParams.game_id
        }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };

    $scope.getApiUsersMeParams = {
      auth_token: ''
    }
    $scope.getApiUsersMe = function(){
      var req = {
        method: 'GET',
        url: '/api/users/me',
        headers: {
          'Authorization': 'Bearer ' + $scope.getApiUsersMeParams.auth_token
        }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };

    $scope.postApiQuestionsParams = {
      auth_token: '',
      game_id: '',
      title: 'ゲームのタイトルです。〜〜に関する質問です。',
      text: '本文です。〜〜に関して＊＊を効率よく集める方法をおしえてください。'
    }
    $scope.postApiQuestions = function(){
      var req = {
        method: 'POST',
        url: '/api/questions',
        headers: {
          'Authorization': 'Bearer ' + $scope.postApiQuestionsParams.auth_token
        },
        data: {
          game_id: $scope.postApiQuestionsParams.game_id,
          title: $scope.postApiQuestionsParams.title,
          text: $scope.postApiQuestionsParams.text
       }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.getApiQuestionsParams = {
      auth_token: '',
      count: 20,
      game_id: '',
      until_id: '',
      unanswered: 'false'
    }
    $scope.getApiQuestions = function(){
      var req = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + $scope.getApiQuestionsParams.auth_token
        },
        url: '/api/questions?'
          + ( $scope.getApiQuestionsParams.count ? '&count=' +  $scope.getApiQuestionsParams.count: '' )
          + ( $scope.getApiQuestionsParams.game_id ? '&game_id=' +
          $scope.getApiQuestionsParams.game_id: '' )
          + ( $scope.getApiQuestionsParams.until_id ? '&until_id=' +
          $scope.getApiQuestionsParams.until_id: '' )
          + ( $scope.getApiQuestionsParams.unanswered ? '&unanswered=' +
          $scope.getApiQuestionsParams.unanswered: '' )
      };
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.getApiAnswersParams = {
      auth_token: '',
      count: 10,
      question_id: '',
      until_id: ''
    }
    $scope.getApiAnswers = function(){
      var req = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + $scope.getApiAnswersParams.auth_token
        },
        url: '/api/answers?'
          + ( $scope.getApiAnswersParams.count ? '&count=' +  $scope.getApiAnswersParams.count: '' )
          + ( $scope.getApiAnswersParams.question_id ? '&question_id=' +
          $scope.getApiAnswersParams.question_id: '' )
          + ( $scope.getApiAnswersParams.until_id ? '&until_id=' +
          $scope.getApiAnswersParams.until_id: '' )
      };
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiAnswersParams = {
      auth_token: '',
      question_id: '',
      text: '本文です。回答のテストじゃよ。'
    }
    $scope.postApiAnswers = function(){
      var req = {
        method: 'POST',
        url: '/api/answers',
        headers: {
          'Authorization': 'Bearer ' + $scope.postApiAnswersParams.auth_token
        },
        data: {
          question_id: $scope.postApiAnswersParams.question_id,
          text: $scope.postApiAnswersParams.text
       }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.putApiAnswersBestParams = {
      auth_token: '',
      answer_id: '',
    }
    $scope.putApiAnswersBest = function(){
      var req = {
        method: 'PUT',
        url: '/api/answers/best',
        headers: {
         'Authorization': 'Bearer ' + $scope.putApiAnswersBestParams.auth_token
        },
        data: {
          answer_id: $scope.putApiAnswersBestParams.answer_id
        }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiCommentsParams = {
      auth_token: '',
      question_id: '',
      answer_id: '',
      text: '本文です。コメントのテストなんです。'
    }
    $scope.postApiComments = function(){
      var req = {
        method: 'POST',
        url: '/api/comments',
        headers: {
          'Authorization': 'Bearer ' + $scope.postApiCommentsParams.auth_token
        },
        data: {
          question_id: $scope.postApiCommentsParams.question_id,
          answer_id: $scope.postApiCommentsParams.answer_id,
          text: $scope.postApiCommentsParams.text
       }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.getApiCommentsParams = {
      auth_token: '',
      question_id: '',
      answer_id: '',
      count: 10,
      until_id: ''
    }
    $scope.getApiComments = function(){
      var req = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + $scope.getApiCommentsParams.auth_token
        },
        url: '/api/comments?'
          + ( $scope.getApiCommentsParams.count ? '&count=' +  $scope.getApiCommentsParams.count: '' )
          + ( $scope.getApiCommentsParams.question_id ? '&question_id=' +
          $scope.getApiCommentsParams.question_id: '' )
          + ( $scope.getApiCommentsParams.answer_id ? '&answer_id=' +
          $scope.getApiCommentsParams.answer_id: '' )
          + ( $scope.getApiCommentsParams.until_id ? '&until_id=' +
          $scope.getApiCommentsParams.until_id: '' )
      };
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiLikesParams = {
      auth_token: '',
      answer_id: ''
    }
    $scope.postApiLikes = function(){
      var req = {
        method: 'POST',
        url: '/api/likes',
        headers: {
          'Authorization': 'Bearer ' + $scope.postApiLikesParams.auth_token
        },
        data: {
          answer_id: $scope.postApiLikesParams.answer_id
       }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiReportsParams = {
      auth_token: '',
      question_id: '',
      answer_id: '',
      comment_id: '',
      text: '通報してやる〜〜'
    }
    $scope.postApiReports = function(){
      var req = {
        method: 'POST',
        url: '/api/reports',
        headers: {
          'Authorization': 'Bearer ' + $scope.postApiReportsParams.auth_token
        },
        data: {
          question_id: $scope.postApiReportsParams.question_id,
          answer_id: $scope.postApiReportsParams.answer_id,
          comment_id: $scope.postApiReportsParams.comment_id,
          text: $scope.postApiReportsParams.text
       }
      }
      $http(req)
      .success(function(res){
        console.log(res);
      });
    };


    $scope.postApiGamesParams = {
      title: 'ねこあつめ',
      genre: 'コレクション,放置ゲー',
      description: 'ねこを集めるゲームです',
      image: 'dummy.png'
    }
    $scope.postApiGames = function(){
      $http.post('/api/games', {
        title: $scope.postApiGamesParams.title,
        genre: $scope.postApiGamesParams.genre.split(','),
        description: $scope.postApiGamesParams.description,
        image: $scope.postApiGamesParams.image,
      })
      .success(function(res){
        console.log(res);
      });
    };

  });
