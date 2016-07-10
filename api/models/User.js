/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');

var User = module.exports = {
    attributes: {
        id: {
            type: 'string',
            primaryKey: true,
            unique: true,
            defaultsTo: function() {
                return uuid.v4();
            }
        },
        username: {
            type: 'string',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        photo: {
            type: 'string'
        },
        toJSON: function() {
            var user = this.toObject();
            delete user.password;
            delete user.profilePicture;
            return user;
        },
        validPassword: function(password, callback) {
            var obj = this.toObject();
            if (callback) {
                return bcrypt.compare(password, obj.password, callback);
            }
            return bcrypt.compareSync(password, obj.password);
        }
    },
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, null, null, function(err, hash) {
            if (err) return next(err);
            values.password = hash;
            next();
        });
    },
    beforeUpdate: function(values, next) {
        if (values.password) {
            bcrypt.hash(values.password, null, null, function(err, hash) {
                if (err) return next(err);
                values.password = hash;
                next();
            });
        } else {
            next();
        }
    }
};
