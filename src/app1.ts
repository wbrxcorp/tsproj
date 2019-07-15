import angular = require("angular");

declare const PRODUCTION: boolean;

angular.module("App1", [ ]).
run(["$rootScope", function($rootScope) {
  $rootScope["hoge"] = "APP1APP1APP1";
  console.log("Production mode:" + PRODUCTION);
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['App1']);
});
