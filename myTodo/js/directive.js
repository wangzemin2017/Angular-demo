//自定义一个双击获得焦点的指令
(function(angular){
	var app = angular.module('myTodo');
	app.directive('getFocused', [function(){
		return {
			link: function(scope, element, attr){
				element.on('dblclick', function(){
					element.find('input').eq(1)[0].focus();
				});
			}
		}
	}]);
	
})(angular)