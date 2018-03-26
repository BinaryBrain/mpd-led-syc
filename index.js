"use strict";

const beats = require('./beats.js').beats;

const mpd = require('mpd')
const cmd = mpd.cmd

const client = mpd.connect({
	port: 6600,
	host: 'mpd.fixme.ch',
})

client.on('ready', function() {
	console.log("ready")
})

// Trigger: on playlist update, on volume update
client.on('system', function(name) {
	console.log("update", name)
})

// Trigger: on play/pause
// Trigger: on next song
// Trigger: fast forward/backward
client.on('system-player', function() {
	client.sendCommand(cmd("status", []), function(err, msgStr) {
		if (err) throw err
		// console.log(msgStr)
		let status = mpd.parseKeyValueMessage(msgStr)

		if (status.state === 'play') {
			let elapsed = parseFloat(status.elapsed)
			console.log("ELAPSED:", elapsed)
			initTimeouts(elapsed)
		}

		/*
		volume: 75
		repeat: 0
		random: 0
		single: 0
		consume: 0
		playlist: 4281
		playlistlength: 148
		xfade: 0
		mixrampdb: 0.000000
		mixrampdelay: nan
		state: play
		song: 146
		songid: 3620
		time: 0:231
		elapsed: 0.000
		bitrate: 32
		audio: 48000:24:2
		nextsong: 147
		nextsongid: 3619
		*/
	})
})

function initTimeouts(elapsed) {
	for (let beat of beats) {
		setTimeout(function() {
			console.log("beat:", beat)
		}, (beat - elapsed) * 1000)
	}
}
