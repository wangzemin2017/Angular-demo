(function(angular){
	var app = angular.module('myTodo');
	app.service('todoFty', ['$window', function($window){
		return {
			set: function(tasks){
				$window.localStorage.setItem('myStorage', JSON.stringify(tasks));
			},
			get: function(){
				return JSON.parse($window.localStorage.getItem('myStorage') || '[]');
			}
		};
	}]);
})(angular);