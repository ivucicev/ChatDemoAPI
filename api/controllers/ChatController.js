/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	channelSubscribe: function(req, res) {
		if (req.isSocket) {
			sails.sockets.join(req, req.session.user.id, function(err) {
				sails.sockets.join(req, 'public', function(err) {
					return res.send("subscribed to public and " + req.session.user.id);
				});
		    });
		}
	},
	sendMessage: function(req, res) {
		if (req.isSocket && req.method === 'POST') {
			var data = req.params.all();
			console.log(data.to, data.from, data.message);
			sails.sockets.broadcast(data.to, 'chat', {
				to: data.to,
				from: data.from,
				message: data.message,
				createdAt: data.createdAt,
				fromUsername: data.fromUsername
			});
			return res.ok();
		}
	}
};
