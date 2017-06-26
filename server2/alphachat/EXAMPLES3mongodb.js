'use strict';
require('dotenv').config();
////////////////////////////////////////////////////////////////////////
////////   Message Class Captures  Message LifeCycle Data        ///////
///////    classifier - npm natural topic id                    ///////
//////////////////////////////////////////////////////////////////////
import mongoose             from "mongoose";
import channels             from '../../config/channels'

var Schema = mongoose.Schema,
    settings = require('../../config/local_settings'),
    bcrypt = require('bcrypt'),
    ObjectId = mongoose.Types.ObjectId;


////////////////////////////////////////////////////////////////
////// Configure Data Store for Capturing Conversations  //////
//////////////////////////////////////////////////////////////

const dbURI =  process.env.MONGO_URI;

mongoose.connect(dburi);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are successfully connected.")
});

//Define the entity
var UserSchema = Schema({
    "first_name": String,
    "last_name": String,
    "url": String,
    "email": String,
    "username": {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    "password": {
        type: String,
        required: true
    }
});

// Saves the user's password hashed
UserSchema.pre('save', function(next) {
    var user = this;                    // 'this' context inside of pre and post functions is the document instance

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//Add one new user to the database
UserSchema.statics.addOne = function(req, done) {
    var User = this,
        body = req.body,
        data = { //sets all the defaults
            "first_name": "",
            "last_name": "",
            "email": "",
            "username": "",
            "url": "",
            "password": ""
        };

    data = Object.assign(data, body);

    User.create(data, function(err, user) {
        if (err) {
            return done(err, {
                "error": err
            });
        }
        return done(null, user);
    });

}

//Edit one user, first find the user based on the userid
//Then edit with POST values
UserSchema.statics.editOne = function(userid, req, done) {
    var User = this,
        body = req.body,
        data = { //sets all the defaults
            "first_name": "",
            "last_name": "",
            "email": "",
            "username": "",
            "url": "",
            "password": ""
        };

    data = Object.assign(data, body);

    if (userid) {
        User.findOneAndUpdate({
            _id: userid
        }, data, {
            upsert: true
        }, function(err, user) {
            if (err) {
                return done(err, {
                    "error": err
                });
            }
            return done(null, user);
        });
    }
}

//Retrieve all users
UserSchema.statics.getAll = function(done) {
    this.find({}, function(err, users) {
        var arr = [];

        if (err) {
            return done(err, {
                "error": err
            });
        }

        users.forEach(function(user) {
            arr.push(user);
        });

        return done(null, arr);

    });
}

//Retrieve a particular user, based on the userid
//which we get from the GET url
UserSchema.statics.getOne = function(userid, done) {
    this.findOne({
        "_id": userid
    }, function(err, user) {
        if (err) return done(err, {
            "error": err
        });

        if (!user) {
            return done(null, {
                "error": "None."
            });
        }

        return done(null, user);
    });
}

//Remove one user based on the userid
//which we get from the DELETE url
UserSchema.statics.removeOne = function(userid, done) {
    var User = this;

    this.remove({
        "_id": userid
    }, function(err, args) {
        if (err) return done(null, {
            "error": err
        });
        return done(null, {
            "msg": "Successfully removed."
        });
    });
}

var User = mongoose.model("User", UserSchema);
module.exports = User;
