/*global define */
define(['angular', 'services-module', 'underscore'], function (angular, services, _) {
	'use strict';

	var DataLoader = function(DS, $q) {
        var baseURL = "http://www.eliteinsite.com/api/amigo/";
        var apiKey = "eliteinsite.com";

        //Holding variables
        var games = [];
        var players = [];
        var gameInFocus = undefined;


		var ds = {
			login: DS(baseURL+'login/?apiKey='+apiKey+'&:uname&:pw'),
			leavegame: DS(baseURL+'leave/?apiKey='+apiKey+'&:uid&:eid&:jid'),
			allPlayers: DS(baseURL+'allPlayers/?apiKey='+apiKey+'&:eid'),
			pickAPlayer: DS(baseURL+'pickAPlayer/?apiKey='+apiKey+'&:eid&:uid'),
			getGames: DS(baseURL+'myEvents/?apiKey='+apiKey+'&:uid'),
			createGame: DS(baseURL+'createEvent/?apiKey='+apiKey+'&:uid&:evtName&:evtDollarMin&:evtDollarMax&:evtDate&:evtDetails'),
			addPlayer: DS(baseURL+'assocPlayer/?apiKey='+apiKey+'&:user&:eid'),
			register: DS(baseURL+'registerUser/?apiKey='+apiKey+'&:name&:tel&:password&:username&:email'),
			saveChanges: DS(baseURL+'saveChanges/?apiKey='+apiKey+'&:id&:name&:tel&:password&:username&:email&:comment'),
            deletePlayer: DS(baseURL+'deletePlayer/?apiKey='+apiKey+'&:uid&:eid&:jid')
		};

        var setGameInfocus = function(id){
            this.gameInFocus = id;
        }


		var register = function(name,tel,password,username,email) {
            return ds.register.get({name:name,tel:tel,password:password,username:username,email:email});
        };
		var saveChanges = function(user) {
            return ds.saveChanges.get({id:user.id,name:user.name,tel:user.tel,password:user.password_new,username:user.username,email:user.email,comment:user.comment});
        };
		var getLogin = function(un,passw) {
            return ds.login.get({uname:un,pw:passw});
        };
        var loadGames = function(uid){
            return ds.getGames.get({uid:uid});
        }
        var allPlayers = function(eid){
            return ds.allPlayers.get({eid:eid});
        }
        var leaveGame = function(uid,jid,eid){
            return ds.leavegame.get({uid:uid,jid:jid,eid:eid});
        }
        var deletePlayer = function(uid,jid,eid){
            return ds.deletePlayer.get({uid:uid,jid:jid,eid:eid});
        }
        var pickAPlayer = function(eid,uid){
            return ds.pickAPlayer.get({eid:eid,uid:uid});
        }
        var getGames = function(){
            return this.games;
        }
        var setGames = function(data){
            this.games = data;
        }
        var getPlayers = function(){
            return this.players;
        }
        var setPlayers = function(data){
            this.players = data[0];
        }

        var createGame = function(uid,evtName,evtDollarMin,evtDollarMax,evtDate,evtDetails){
            return ds.createGame.get({uid:uid,evtName:evtName,evtDollarMin:evtDollarMin,evtDollarMax:evtDollarMax,evtDate:evtDate,evtDetails:evtDetails});

        }
        var addPlayer = function(user,eid){
            return ds.addPlayer.get({user:user,eid:eid});

        }

		// This is done in order to seperate the actual calling of the service from the
		// generating of input because events for both maybe different.
		// @overloaded method.
		var input = function(item, value) {
			// The object to insert to the payload.
			var object = {};

			if(typeof value === 'undefined' && typeof item === 'object') {
				_.extend(object, item);
			}

			if(typeof value !== 'undefined' && typeof item !== 'undefined') {
				object[item] = value;
			}

			// Add the object to the payload.
			_.extend(payload, object);

			return payload;
		};

		return {
			getLogin: getLogin,
            games:games,
            loadGames:loadGames,
            allPlayers:allPlayers,
            setGames:setGames,
            getGames:getGames,
            setPlayers:setPlayers,
            getPlayers:getPlayers,
            leaveGame:leaveGame,
            createGame:createGame,
            addPlayer:addPlayer,
            deletePlayer:deletePlayer,
            register:register,
            saveChanges:saveChanges,
            pickAPlayer:pickAPlayer,
			input: input
		};
	};

	// Factory function. Generate an instance of the parts loader.
	var Factory = function() {
		var loader = DataLoader.apply(null, arguments);

		window.loader = loader;
		return loader;
	};

	// Register the parts loader.
	services.factory('data.loader', ['ds', '$q', Factory]);
	return services;
});
