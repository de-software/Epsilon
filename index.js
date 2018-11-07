var eris = require('eris');

var EPSILON = new Object();

function epsilonClient(token) {
	this.client = new eris(token, {
		autoreconnect: true,
		compress: false,
		disableEveryone: false,
		getAllUsers: true,
		defaultImageFormat: 'webp',
		defaultImageSize: 2048,
	})
};

epsilonClient.prototype.postReply = function(channel, data) {
	this.client.createMessage(channel, data);
};

epsilonClient.prototype.isCommand = function(prefix, callback) {
	if(message.content.startsWith(prefix)) {
		callback(message.content.replace(prefix,'').trim().split(' '));
	} else {
		callback(null);
	}
};

epsilonClient.prototype.getCommands = function(directory) {
	var commandsList = new Array();

	if(directory == undefined || !directory) {
		directory = './commands/';
	} else {
		if(!directory.startsWith('./') && !directory.endsWith('/')) {
			directory = './' + directory + '/';
		}
	}

	require('fs').readdir(directory, async(error, files) => {
		if(error) throw new Error(error);

		var commFiles = files.filter(data => data.split('.').pop() == 'js');

		if(commFiles.length <= 0) throw new Error(`Commands not found in "${directory}"!`);

		commFiles.forEach(async (file, i) => {
			var file = file.substring(0, file.indexOf('.'));

			var command = require(directory + file);

			commandsList.push(command);
		})
	})
	return commandsList;
};

module.exports = EPSILON;
