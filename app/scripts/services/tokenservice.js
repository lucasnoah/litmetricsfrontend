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
    this.grabTokensForCorpus = function (corpusId, pageNumber) {

      return $http.get(API_URL + 'tokens/?corpus_id=' + corpusId.toString() + '&page=' + pageNumber.toString())
    }

    this.filterTokenByUserChoice = function (tokenList, rules) {
      //filter out tokens not wanted by user
      var output = [];
      var filtered = [];
      var posPasses = 0;
      var stopwordPasses = 0;
      var nerRemoves = 0;
      //transfrom stopwords to list from string
      var stopwordList = rules.stopwords.split(',');

      angular.forEach(tokenList, function (value, key) {
        //check to make sure they want the pos tag
        if (rules.pos.indexOf(value.pos) >= 0) {
          posPasses = posPasses + 1;
          //check to make sure its not in the stopword list
          if (!(stopwordList.indexOf(value.lemma.toLowerCase()) >= 0)) {
            stopwordPasses = stopwordPasses + 1;
            //handle NER
            if (rules.ner == false) {
              output.push(value)
            }
            else {
              if (value.ner == 'O') {
                nerRemoves = nerRemoves + 1;
                output.push(value)
              }
              else {
                filtered.push(value)
              }
            }
          }
          else {
            filtered.push(value)
          }
        }

        else {
          filtered.push(value)
        }
      });
      return {selected: output, removed: filtered}
    };

    this.getPosTokenList = function () {
      //return a list of peen treebank tag identifiers
      var tagList = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN', 'NNS', 'NNP', 'NNPS',
        'PDT', 'PDT', 'POS', 'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'SYM', 'TO', 'UH', 'VB', 'VBD', 'VBG', 'VBN',
        'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB'];
      return tagList
    };

    function generateRandomHex() {
      //generate a random hex code for the buttons
      var hex = '#' + Math.floor(Math.random() * 16777215).toString(16);
      return hex
    }

    this.getPosColorList = function () {
      var tagList = [
        {tag: 'CC', color: generateRandomHex(), tagName: 'Coordinating conjunction'},
        {tag: 'CD', color: generateRandomHex(), tagName: 'Cardinal number'},
        {tag: 'DT', color: generateRandomHex(), tagName: 'Determiner'},
        {tag: 'EX', color: generateRandomHex(), tagName: 'Existential there'},
        {tag: 'FW', color: generateRandomHex(), tagName: 'Foreign word'},
        {tag: 'IN', color: generateRandomHex(), tagName: 'Preposition'},
        {tag: 'JJ', color: generateRandomHex(), tagName: 'Adjective'},
        {tag: 'JJR', color: generateRandomHex(), tagName: 'Adjective,comparative'},
        {tag: 'JJS', color: generateRandomHex(), tagName: 'Adjective, superlative'},
        {tag: 'LS', color: generateRandomHex(), tagName: 'List item marker'},
        {tag: 'MD', color: generateRandomHex(), tagName: 'Modal'},
        {tag: 'NN', color: generateRandomHex(), tagName: 'Noun, singular or mass'},
        {tag: 'NNS', color: generateRandomHex(), tagName: 'Noun, plural'},
        {tag: 'NNP', color: generateRandomHex(), tagName: 'Proper noun, singular'},
        {tag: 'PDT', color: generateRandomHex(), tagName: 'Predeterminer'},
        {tag: 'POS', color: generateRandomHex(), tagName: 'Possessive ending'},
        {tag: 'PRP', color: generateRandomHex(), tagName: 'Personal pronoun'},
        {tag: 'PRP$', color: generateRandomHex(), tagName: 'Possessive pronoun'},
        {tag: 'RB', color: generateRandomHex(), tagName: 'Adverb'},
        {tag: 'RBR', color: generateRandomHex(), tagName: 'Adverb, comparative'},
        {tag: 'RBS', color: generateRandomHex(), tagName: 'Adverb, superlative'},
        {tag: 'RP', color: generateRandomHex(), tagName: 'Particle'},
        {tag: 'SYM', color: generateRandomHex(), tagName: 'Symbol'},
        {tag: 'TO', color: generateRandomHex(), tagName: 'to'},
        {tag: 'UH', color: generateRandomHex(), tagName: 'Interjection'},
        {tag: 'VB', color: generateRandomHex(), tagName: 'Verb, base form'},
        {tag: 'VBD', color: generateRandomHex(), tagName: 'Verb, past tense'},
        {tag: 'VBG', color: generateRandomHex(), tagName: 'Verb, gerund'},
        {tag: 'VBN', color: generateRandomHex(), tagName: 'Verb, past participle'},
        {tag: 'VBP', color: generateRandomHex(), tagName: 'Verb, non-3rd person singular'},
        {tag: 'VBZ', color: generateRandomHex(), tagName: 'Verb, 3rd person singular'},
        {tag: 'WDT', color: generateRandomHex(), tagName: 'Wh-determiner'},
        {tag: 'WP', color: generateRandomHex(), tagName: 'Wh-pronoun'},
        {tag: 'WP$', color: generateRandomHex(), tagName: 'Possessive wh-pronoun'},
        {tag: 'WRB', color: generateRandomHex(), tagName: 'Wh-adverb'},
        {tag: 'NNPS', color: generateRandomHex(), tagName: 'Proper noun, plural'}]

      return tagList
    }

    this.getPosSelectList = function () {
      var tagList = this.getPosTokenList()
      var selectTagList = []
      angular.forEach(tagList, function (value, key) {
        var item = {
          name: value
        }
        selectTagList.push(item)

      })
      return selectTagList
    }

    this.getNerList = function () {
      var nerList = []
    }
  });
