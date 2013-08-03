var fs = require('fs'),
	async = require('async'),
	express = require('express'),
	http = require('http');

var app = express().use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	//If user is authenticated, send to profile
	//Otherwise send them to index (login/signup screen)
	if (authenticated(req)) {
		res.render("profile", {
			//Insert a send user data JSON here
			title: makeTitle("Profile")
		})
	} else {
		res.render("index", {
			title: makeTitle()
		})
	}
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/*----------------------HELPER FUNCTIONS------------------------*/

function makeTitle(str) {
	if (str==null)
		return "Classify";
	else
		return "Classify | " + str; 
}

function authenticated(req){
	return true;
}

