(function (angular) {
	'use strict';

	// 创建一个myTodo模块和mainCtrl控制器，是入口文件
	angular.module('myTodo', [])
		.controller('mainCtrl' ,function($scope, todoFty, $location){

			$scope.tasks = todoFty.get();
			// $scope.tasks = [
			// 	{ 
			// 		id: 1, 
			// 		input:'abc', 
			// 		completed:false
			// 	},{id:2, input:'def', completed:false},
			// 	{id:3, input:'test', completed:false}
			// ];
			//绑定 What needs to be done? 输入框的内容
			$scope.input = '';

			//当前正在编辑的任务的Id
			$scope.currentId = 0;

			//添加将要做的任务
			$scope.add = function(){
				if(!$scope.input){
					return;
				}
				$scope.tasks.push({id: Math.random(), input: $scope.input, completed: false});
				//console.log($scope.tasks);
				$scope.input = '';
				$scope.save();
			};

			//移除已完成任务
			$scope.remove = function(current){
				//console.log(current);
				$scope.tasks.splice($scope.tasks.indexOf(current),1);
			};

			$scope.focused = false;
			//双击编辑任务
			$scope.edit = function(task){
				$scope.currentId = task.id;
				$scope.focused = true;
			};

			//保存编辑好的任务
			$scope.save = function(){
				todoFty.set($scope.tasks);
				$scope.currentId = 0;
			};

			//剩余未完成任务数
			$scope.taskLeft = function(){
				var left = [];
				$scope.tasks.forEach(function(task){
					if(!task.completed){
						left.push(task);
					}
				});
				return left.length;
			};

			//有任务未完成时
			$scope.hasUncompleted = function(){
				return $scope.tasks.some(task => task.completed == true);
			};

			//清空已完成任务
			$scope.clear = function(){
				var left = [];
				$scope.tasks.forEach(function(task){
					if(!task.completed){
						left.push(task);
					}
				});
				$scope.tasks = left;
				return left;
			};

			$scope.all = false;
			//选择所有任务为已完成
			$scope.selectAll = function(){
				if($scope.all == true){
					$scope.tasks.forEach(task => task.completed = true);
				}else{
					$scope.tasks.forEach(task => task.completed = false);
				}
			};

			//All,Active,Completed
			//console.log($location)
			$scope.filterObj = {};
			$scope.location = $location;
			console.log($location.url());
			$scope.$watch('location.url()', function(now, old){
				switch (now){
					case '/active': 
						$scope.filterObj = {selected: true};
						break;
					case '/completed': 
						$scope.filterObj = {selected: false};
						break;
					default: 
						$scope.filterObj = {};
				}
			});
	})
	
	
})(angular);
