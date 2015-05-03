/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var Reflux = require('reflux'),
    $ = require('jquery'),
    router = require('../../router'),
    { requestGet, requestPost, requestPostForm }= require('../../utils/RESTCall');

var PostsActions = Reflux.createActions({

  // API GET actions
  'getPosts': { asyncResult: true },
  'getPost': { asyncResult: true },
  'getComments': { asyncResult: true },

  // post actions
  'submitPost':{ asyncResult: true },
  'upvotePost':{ asyncResult: true },
  'cancelUpvotePost':{ asyncResult: true },
  //'downvotePost':{},
  'deletePost':{ asyncResult: true },

  // comment actions
  'submitComment': { asyncResult: true },
  'upvoteComment': { asyncResult: true },
  'cancelUpvoteComment': { asyncResult: true },
  //'downvoteComment': {},
  'deleteComment': { asyncResult: true },

  // following procedures
  'nextSubmitPostCompleted': {},
  'clearAllPostsCommentsStore': {},
  'clearAllPostsStore': {},
  'clearAllCommentsStore': {},

  // for guarrentee sequencial processing store update
  'thenGetPostsCompleted': {},
  'thenGetCommentsCompleted': {},
  'thenSubmitCommentCompleted': {},

  'clearPostStore': {},
  'clearPostListStore': {},
  'clearCommentStore': {},
  'clearCommentListStore': {},

  //All clear store and notify clean process end and refresh data.
  'refreshDataFromStore': {}

});


/* API Get Actions
 ===============================*/
PostsActions.getPosts.preEmit = function(requestUrl, query, callback) {
  requestGet(requestUrl,query,callback)
    .then(this.completed)
    .catch(this.failed);
};

// TODO : Check {} undefined value pass this request
PostsActions.getPost.preEmit = function(requestUrl, callback) {
  requestGet(requestUrl,{},callback)
    .then(this.completed)
    .catch(this.failed);
};

PostsActions.getComments.preEmit = function(requestUrl, callback) {
  requestGet(requestUrl,{},callback)
    .then(this.completed)
    .catch(this.failed);
};


/* Post Actions
 ===============================*/
PostsActions.submitPost.preEmit = function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};

// Upvote, Cancel_Upvote postx
PostsActions.upvotePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

PostsActions.cancelUpvotePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/cancel_upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

// Delete post
PostsActions.deletePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/'+'?_method=DELETE';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};


/* Comment Actions
 ===============================*/
PostsActions.submitComment.preEmit = function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};

// Upvote, Cancel_Upvote post
PostsActions.upvoteComment.preEmit= function(commentId) {
  var requestUrl = '/comments/'+commentId+'/upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

PostsActions.cancelUpvoteComment.preEmit= function(commentId) {
  var requestUrl = '/posts/'+commentId+'/cancel_upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

// Delete post
PostsActions.deleteComment.preEmit= function(commentId) {
  var requestUrl = '/posts/'+commentId+'/'+'?_method=DELETE';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};


/* Follwing Procedures
 ===============================*/
PostsActions.nextSubmitPostCompleted.listen(function(response) {
  PostsActions.clearAllPostsStore(PostsActions.refreshDataFromStore);
});

PostsActions.clearAllPostsCommentsStore.listen(function(callback) {
  PostsActions.clearAllPostsStore(function(){
    PostsActions.clearAllCommentsStore(callback);
  });
});

PostsActions.clearAllPostsStore.listen(function(callback) {
  PostsActions.clearPostListStore(function(){
    PostsActions.clearPostStore(callback);
  });
});
PostsActions.clearAllCommentsStore.listen(function(callback) {
  PostsActions.clearCommentListStore(function(){
    PostsActions.clearCommentStore(callback);
  });
});

module.exports = PostsActions;
