/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),

    //components
    TopicCard = require('./postlist/TopicCard.jsx'),
    Posts = require('./postlist/Posts.jsx'),
    PostComposer = require('./postlist/PostComposer.jsx'),
    //actions
    PostsActions = require('../../actions/posts/PostsActions');


var Topic = React.createClass({

  mixins: [
    PureRenderMixin,
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Topic title'>
        <div className="topic main-container content full-width">
          <TopicCard/>
          <PostComposer {...this.props} />
          <h3>And posts list</h3>
          <Posts {...this.props} />
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = Topic;
