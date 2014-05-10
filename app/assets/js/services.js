var nitServices = angular.module('nitServices', ['LocalStorageModule']);

var urlBase = '/api/unions/';


/**
 * Article Service
 */

nitServices.factory('articleService', ['$http', '$q', '$upload', function($http, $q, $upload) {
  var error = function() {
    console.log(arguments);
  };

  var articleCache = {};

  var saveCache = function(union) {
    return function(response) {
      articleCache[union] = response.data;
      return articleCache[union];
    };
  };

  return {

    findAll: function(union) {
      if (!_.isEmpty(articleCache[union])) {
        var d = $q.defer();
        d.resolve(articleCache[union]);
        console.log('Saved one HTTP request.');
        return d.promise;
      }
      return $http.get(urlBase + union + '/articles').then(saveCache(union), error);
    },

    findAllEvents: function(union) {
      return $http.get(urlBase + union + '/events').error(error);
    },

    findAllNoUnion: function() {
      return $http.get('/api/articles').error(error);
    },

    findBySlug: function(union, slug) {
      return $http.get(urlBase + union + '/articles/' + slug).error(error);
    },

    create: function(union, article) {
      console.log("article", article);
      var image = article.image;
      article.image = null;
      return $upload.upload({
        url: urlBase + union + '/articles',
        method: 'POST',
        data: article,
        file: image
      }).error(error);
    },

    update: function(union, article) {
      var image = article.image;
      article.image = null;
      return $upload.upload({
        url: urlBase + union + '/articles/' + article.slug,
        method: 'PUT',
        data: article,
        file: image
      }).error(error);
    },

    destroy: function(union, article) {
      return $http.delete(urlBase + union + '/articles/' + article.slug).error(error);
    },

    save: function(union, article) {
      if (article._id) return this.update(union, article);
      return this.create(union, article);
    }
  };
}]);

nitServices.factory('unionService', ['$http', 'localStorageService', function($http, localStorageService) {
  var error = function() {
    console.log(arguments);
  };

  var urlBase = '/api/unions';

  return {
    last: function() {
      return localStorageService.get('union') || {slug: 'general'};
    },

    pick: function(union) {
      localStorageService.add('union', union);
    },

    create: function(union) {
      return $http.post(urlBase, union).error(error);
    },

    update: function(union) {
      return $http.put(urlBase + union._id, union).error(error);
    },

    save: function(union) {
      if (union._id) return this.update(union);
      return this.create(union);
    },

    findAll: function() {
      return $http.get(urlBase).error(error);
    },

    findByName: function(name) {
      return $http.get(urlBase + name).error(error);
    }
  };
}]);
