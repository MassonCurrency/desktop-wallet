var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
	files: ['src/**/**',
	        '!src/node_modules/**/**',
	        'src/node_modules/sjcl/**/**',
	        'src/node_modules/bootstrap/dist/**/**',
	        'src/node_modules/font-awesome/**/**',
	        'src/node_modules/jquery/dist/jquery.min.js',
	        'src/node_modules/angular/angular.min.js',
	        'src/node_modules/angular-route/angular-route.min.js',
	        'src/node_modules/angular-translate/dist/angular-translate.min.js',
	        'src/node_modules/chart.js/dist/Chart.min.js',
	        'src/node_modules/angular-chart.js/dist/angular-chart.min.js',
	        'src/node_modules/underscore/underscore-min.js',
//	        'src/node_modules/ripple-lib/build/ripple-0.12.5-rc2-min.js',
	        'src/node_modules/stellar-sdk/dist/stellar-sdk.min.js',
	        'src/node_modules/qrcode-generator/qrcode.js',
	        'src/node_modules/qrcode-generator/qrcode_UTF8.js',
	        'src/node_modules/angular-qrcode/angular-qrcode.js'
	],
	platforms: ['win64'],
	flavor : 'normal',
	version: '0.28.1',
	appName: 'MassonCurrencyWallet',
	appVersion : 'v3.6',
	macIcns: 'src/img/rocket.icns',
	winIco : 'src/img/maslogo_480.png'
});

nw.on('log', console.log);

nw.build().then(function(){
	console.log('Build done!');
});

// nwjs version can refer to https://nwjs.io/version.json
// you may need to help nw-builder to find the correct version. :)
/*
//version.js:177
var version;
for(var v in versions) {
	if (versions[v].version === args.desiredVersion) {
		version = versions[v];
	}
}
return version ? Promise.resolve(version) : Promise.reject('Version ' + args.desiredVersion + ' not found.');
*/
