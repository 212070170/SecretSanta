/*global define */
define(['angular', 'services-module', 'underscore'], function (angular, services, _) {
	'use strict';

	var DataLoader = function(DS, $q) {
        var baseURL = "http://www.eliteinsite.com/api/amigo/";
        var apiKey = "eliteinsite.com";

        //Holding variables
        var games = [];
        var players = [];

		var ds = {
			login: DS(baseURL+'login/?apiKey='+apiKey+'&:uname&:pw'),
			leavegame: DS(baseURL+'leave/?apiKey='+apiKey+'&:uid&:eid&:jid'),
			allPlayers: DS(baseURL+'allPlayers/?apiKey='+apiKey+'&:eid'),
			getGames: DS(baseURL+'myEvents/?apiKey='+apiKey+'&:uid'),
			createGame: DS(baseURL+'createEvent/?apiKey='+apiKey+'&:uid&:evtName&:evtDollarMin&:evtDollarMax&:evtDate&:evtDetails')
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
