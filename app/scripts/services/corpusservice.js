'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.corpusService
 * @description
 * # corpusService
 * Service in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .service('corpusService', function ($http, API_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getUserCorpusList = function(){

      return $http.get(API_URL + 'corpusitems/')

    }

    this.getUserCorpusCollections = function(){

      return $http.get(API_URL + 'collections/')
    }

    this.createCorpusCollection = function(collectionTitle){
      var data = {
        title:collectionTitle,

      }

      return $http.post(API_URL + 'collections/', data)

    }

    this.addItemsToCorpusCollection = function(items, collection){
      var data = {
        corpusItems: items,
        corpusCollection: collection.id

      }
      return $http.post(API_URL + 'collections/add_items/', data);
    }

    this.removeItemFromCollection = function (item, collection) {

      var data = {
        item: item.id,
        collection: collection.id
      }

      return $http.post(API_URL + 'collections/remove_item/', data)

    }

    this.matchCorpusItemById = function(itemsList, newItem){
      var collectionKey = null;
      angular.forEach(itemsList, function(value, key){
        if (value.id - newItem.id == 0){

          collectionKey = key;
        }
      })
      return collectionKey;
    }

    this.exportCollection = function(collection, filter){

        var data = {
          collection: collection,
          filter: filter
        }

      console.log('export data', data)

       return $http.post(API_URL + 'collections/export/', data)

    }

    this.getTokenSum = function(collection){
      /*
      Get the total summed token count for a courpus collection
       */
      var count = 0;
      angular.forEach(collection.items, function(key, val){
        count = count + key.token_count;
      }
      );
      return count
    }

    this.deleteCorpusItem = function(item){
      return $http.delete(API_URL + 'corpusitems/' + item.id.toString() + '/')
    }


  });
