"use strict";

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
    client.sendCommand(cmd("status", []), function(err, msg) {
        if (err) throw err
        console.log(msg)
    })
})
