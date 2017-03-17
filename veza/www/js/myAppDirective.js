angular.module('MyApp.Directives', []);
angular.module('MyApp.Directives', []).directive("fileread", [
  function() {
    alert("s");
    return {
      scope: {
        fileread: "="

      },
      link: function($scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            $scope.$apply(function(fileread) {
            $scope.fileread = loadEvent.target.result;
          });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);
