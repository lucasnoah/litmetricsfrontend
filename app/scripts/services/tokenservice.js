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
          var filtered = []
          var posPasses = 0;
          var stopwordPasses = 0;
          var nerRemoves = 0;
          //transfrom stopwords to list from string
          console.log('thiese rules',rules)
          var stopwordList = rules.stopwords.split(',')


          angular.forEach(tokenList,  function(value,key){
                //check to make sure they want the pos tag
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
                          else{
                  filtered.push(value)
                }
                        }
                  }
                  else{
                  filtered.push(value)
                }
                }

                else{
                  filtered.push(value)
                }

          })
            console.log('pospasses', posPasses)
            console.log('stopwordpasses', stopwordPasses)
            console.log('not nerRemoves', nerRemoves)
            console.log('output length', output.length)
            return {selected:output, removed: filtered}


    }


    this.getPosTokenList = function() {

      //return a list of peen treebank tag identifiers

      var tagList = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN', 'NNS', 'NNP', 'NNPS',
        'PDT', 'PDT', 'POS', 'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'SYM', 'TO', 'UH', 'VB', 'VBD', 'VBG', 'VBN',
        'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB']

      return tagList

    }

   this.getPosColorList = function(){

     var tagList = [
       {tag: 'CC', color:'white', tagName:'Coordinating conjunction' },
       {tag: 'CD', color:'white', tagName:'Cardinal number'},
       {tag: 'DT', color:'white', tagName:'Determiner'},
       {tag: 'EX', color:'white', tagName:'Existential there'},
       {tag: 'FW', color:'white', tagName:'Foreign word'},
       {tag: 'IN', color:'white', tagName:'Preposition'},
       {tag: 'JJ', color:'white', tagName:'Adjective'},
       {tag: 'JJR', color:'white', tagName:'Adjective,comparative'},
       {tag: 'JJS', color:'white', tagName:'Adjective, superlative'},
       {tag: 'LS', color:'white', tagName:'List item marker'},
       {tag: 'MD', color:'white', tagName:'Modal'},
       {tag: 'NN', color:'blue', tagName:'Noun, singular or mass'},
       {tag: 'NNS', color:'white', tagName:'Noun, plural'},
       {tag: 'NNP', color:'white', tagName:'Proper noun, singular'},
       {tag: 'PDT', color:'white', tagName:'Predeterminer'},
       {tag: 'POS', color:'white', tagName:'Possessive ending'},
       {tag: 'PRP', color:'white', tagName:'Personal pronoun'},
       {tag: 'PRP$', color:'white', tagName:'Possessive pronoun'},
       {tag: 'RB', color:'white', tagName:'Adverb'},
       {tag: 'RBR', color:'white', tagName:'Adverb, comparative'},
       {tag: 'RBS', color:'white', tagName:'Adverb, superlative'},
       {tag: 'RP', color:'white', tagName:'Particle'},
       {tag: 'SYM', color:'white', tagName:'Symbol'},
       {tag: 'TO', color:'white', tagName:'to'},
       {tag: 'UH', color:'white', tagName:'Interjection'},
       {tag: 'VB', color:'red', tagName:'Verb, base form'}
       , {tag: 'VBD', color:'lightred', tagName:'Verb, past tense'},
       {tag: 'VBG', color:'white', tagName:'Verb, gerund'},
       {tag: 'VBN', color:'white', tagName:'Verb, past participle'},
       {tag: 'VBP', color:'white', tagName:'Verb, non-3rd person singular'},
       {tag: 'VBZ', color:'white', tagName:'Verb, 3rd person singular'},
       {tag: 'WDT', color:'white', tagName:'Wh-determiner'},
       {tag: 'WP', color:'white', tagName:'Wh-pronoun'},
       {tag: 'WP$', color:'white', tagName:'Possessive wh-pronoun'},
       {tag: 'WRB', color:'white', tagName:'Wh-adverb'},
       {tag: 'NNPS', color:'white', tagName:'Proper noun, plural'}]

      return tagList
   }



    this.getPosSelectList = function(){
      var tagList = this.getPosTokenList()
      var selectTagList = []
      angular.forEach(tagList, function(value, key){
            var item = {
              name: value
            }
            selectTagList.push(item)

      })
      return selectTagList

    }

    this.getNerList = function(){
      var nerList = []
    }



  });
