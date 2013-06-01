/*global window, document, Ghost, Backbone, $, _ */
(function () {

    "use strict";

    Ghost.Router = Backbone.Router.extend({

        routes: {
            'content/': 'blog',
            'editor': 'editor',
            'editor/': 'editor',
            'editor/:id': 'editor'
        },

        blog: function () {
            var posts = new Ghost.Collections.Posts();
            posts.fetch({data: {status: 'all'}}).then(function () {
                Ghost.currentView = new Ghost.Views.Blog({ el: '#main', collection: posts });
            });

        },

        editor: function (id) {
            var post = new Ghost.Models.Post();
            post.urlRoot = Ghost.settings.apiRoot + '/posts';
            if (id) {
                post.id = id;
                post.fetch().then(function () {
                    Ghost.currentView = new Ghost.Views.Editor({ el: '#main', model: post });
                });
            } else {
                Ghost.currentView = new Ghost.Views.Editor({ el: '#main', model: post });
            }
        }

    });

}());