define (require, exports, module)->
   require "angular-material/angular-material.css"
   dataMakerModule = require "../controller/dataMakerController"

   angular.bootstrap document, ["dataMaker"]