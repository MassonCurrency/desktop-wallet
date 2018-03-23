myApp.controller("HeaderCtrl", ['$scope', '$rootScope', '$location', 'UserAuthFactory', 'SettingFactory', 'StellarApi',
  function($scope, $rootScope, $location, UserAuthFactory, SettingFactory, StellarApi) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
      StellarApi.logout();
      $rootScope.reset();
    }
  }
]);

myApp.controller("FooterCtrl", [ '$scope', '$translate', 'SettingFactory',
  function($scope, $translate, SettingFactory) {
	$scope.changeLanguage = function (key) {
	    $translate.use(key);
	    SettingFactory.setLang(key);
	};
}]);

myApp.controller("HomeCtrl", ['$scope', '$rootScope', 'RemoteFactory',
   function($scope, $rootScope, RemoteFactory) {

	RemoteFactory.getStellarTicker(function(err, ticker) {
		if (ticker) {
			$rootScope.stellar_ticker = ticker;
			console.log(ticker);
			update();
		}
	});
	
	$scope.data = [];
	$scope.pie = {
		labels : [],
		data : [],
		options : {legend: {display: true}},
		table : [],
		total : 0,
		reset : function(){
			this.labels = [];
			this.data   = [];
			this.table  = [];
			this.total  = 0;
		}
	};
	function update() {
		$scope.pie.reset();
		$scope.data = [];
		
		$scope.pie.total = 0;
		$rootScope.stellar_ticker.assets.forEach(function(asset){
			if (asset.code == 'MAS') {
				//$scope.pie.total = asset.volume24h_MAS;
			} else {
				if (asset.volume24h_MAS) {
					$scope.pie.total += asset.volume24h_MAS;
					//$scope.pie.labels.push(asset.slug);
					//$scope.pie.data.push(round(asset.volume24h_MAS, 0));
					$scope.data.push({
						slug: asset.slug,
						curr: asset.code, 
						domain: asset.domain, 
						volume: asset.volume24h_MAS, 
						pct: 0
					});
				}
			}
		});
		
		$scope.data.sort((a, b) =>{
			return b.volume - a.volume;
		});

		$scope.data.forEach(item => {
			item.pct = item.volume * 100 / $scope.pie.total;
		});
		
		for (var i=0; i<$scope.data.length; i++) {
			var asset = $scope.data[i];
			if (i<5) {
				$scope.pie.labels.push(asset.slug);
				$scope.pie.data.push(round(asset.volume, 0));
			} else if (i==5) {
				$scope.pie.labels.push('Others');
				$scope.pie.data.push(round(asset.volume, 0));
			} else {
				$scope.pie.data[5] += round(asset.volume, 0);
			}
		}
	}
	
	if ($rootScope.stellar_ticker) {
		update();
	}
}]);

