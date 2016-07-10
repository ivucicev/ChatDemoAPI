/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    checkUsername: function(req, res) {
        var username = req.param("username");
        User.count({
            username: username
        }).exec(function(err, cnt) {
            if (err) return res.badRequest();
            if (cnt) {
                return res.json(200, {
                    count: 1
                });
            } else {
                return res.json(200, {
                    count: 0
                });
            }
        });
    },
    login: function(req, res) {
        // basic login
        User.findOne({
            id: req.session.user.id
        }).exec(function(err, user) {
            if (err) return res.badRequest();
            return res.json(200, {
                user: user
            });
        });
    },
    search: function(req, res) {
        User.find({
            username: {
                'like': '%' + req.param("searchString") + '%'
            },
            id: {
                '!': req.session.user.id
            }
        }, {
            limit: 25
        }).exec(function(err, users) {
            if (err) return res.badRequest();
            return res.json(200, users);
        });
    }
};
