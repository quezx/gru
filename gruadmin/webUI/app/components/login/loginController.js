(function(){

	function loginController($scope, $rootScope, $stateParams, $state, MainService) {
		loginVm = this;
		loginVm.authData = {};

		// Function Declaration
		loginVm.authenticate = authenticate;

		// Functin Deinitions
		function authenticate() {
			if(!loginVm.authData.user || !loginVm.authData.password) {
				SNACKBAR({
					message: "Please fill all the details",
					messageType: "error",
				})
				return;
			}
			MainService.post('/login', loginVm.authData)
			.then(function(data){
				if(data.token) {
					SNACKBAR({
						message: "Logged In Successfuly",
						messageType: "error",
					})
					localStorage.setItem("token", data.token);
					$state.transitionTo('root')
				}
			}, function(err){
				SNACKBAR({
					message: "Wrong username and password",
					messageType: "error",
				})
			})
		}
	}

	var loginDependency = [
	    "$scope",
	    "$rootScope",
	    "$stateParams",
	    "$state",
	    "MainService",
	    loginController
	];
	angular.module('GruiApp').controller('loginController', loginDependency);

})();