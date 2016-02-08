'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.tokenservice
 * @description
 * # tokenservice
 * Service in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .service('tokenService', function ($http, API_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.grabTokensForCorpus = function(corpusId, pageNumber,offsetCount){

      return $http.get(API_URL + 'tokens/?corpus_id=' + corpusId.toString() + '&limit=' + pageNumber.toString() + '&offset=' + offsetCount)
    }

    this.filterTokenByUserChoice = function(tokenList, rules){

          //filter out tokens not wanted by user
          var output = [];
          var posPasses = 0;
          var stopwordPasses = 0;
          var nerRemoves = 0;
          //transfrom stopwords to list from string
          console.log('thiese rules',rules)
          var stopwordList = rules.stopwords.split(',')


          angular.forEach(tokenList,  function(value,key){
                //check to make sure they want the post tag
                if (rules.pos.indexOf(value.pos) >= 0){
                  posPasses = posPasses + 1;
                  //check to make sure its not in the stopword list
                  if (!(stopwordList.indexOf(value.lemma.toLowerCase()) >= 0)){
                        stopwordPasses = stopwordPasses + 1;
                        //handle NER
                        if(rules.ner == false){
                          output.push(value)
                        }
                        else {
                          if(value.ner == 'O'){
                            nerRemoves = nerRemoves + 1;
                            output.push(value)
                          }
                        }
                  }
                }

          })
            console.log('pospasses', posPasses)
            console.log('stopwordpasses', stopwordPasses)
            console.log('not nerRemoves', nerRemoves)
            console.log('output length', output.length)
            return output


    }


    this.getPosTokenList = function() {

      //return a list of peen treebank tag identifiers

      var tagList = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN', 'NNS', 'NNP', 'NNPS',
        'PDT', 'PDT', 'POS', 'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'SYM', 'TO', 'UH', 'VB', 'VBD', 'VBG', 'VBN',
        'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB']

      return tagList

    }





  });
