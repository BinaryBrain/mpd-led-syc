# Notes

## Database

### Track

- id
- songid: same as mpd's `songid`
- name: track's name

### Beats

- id
- trackId
- time: timecode where the beat is (given by aubio)

## Behaviour

### On playlist change

Check if if song in the playlist is represented in the DB.
Otherwise, run `aubiotrack` on each song and add the result in the DB.

### On next/previous song, fast forward/backward, play

Query the current time `time` or `elapsed` (what's the difference?) from the DB on `songid`.

### On pause

Interupt the current timer, so it doesn't trigger the next tick.

## Thoughts

1) To be efficient, query every tick for the current song and use `setTimeout` with
the time difference between the next tick and the current one.

1) Querying beats for the next song before its start will avoid some latency.

1) The system may have some communication latency between MPD, this script and LEDs.
Having the possiblity to add an offest to counterbalance this effect is probably a good idea.

1) We still need some ideas to control the system.

## Current issues

With Aubio, when the music has bridges without any kicks, the beat still goes on and trigger LEDs. If we want to avoid this effect, we'll have to put a low pass filter on the Aubio analyser or on the trigger or something like this.
