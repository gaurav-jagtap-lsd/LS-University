/**
 * YouTube player integration (no GA4/GTM automatic tagging or video events).
 * This file only initializes the player; analytics events are intentionally omitted.
 */

(function() {
    'use strict';

    console.log('🎥 YouTube Player Integration loaded');

    let player;
    const videoId = '8vRjYw2O4Zo'; // The video ID from the URL

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: videoId,
            playerVars: {
                playsinline: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                fs: 1,
                cc_load_policy: 0,
                disablekb: 0,
                enablejsapi: 1,
                origin: window.location.origin
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        });
    };

    function onPlayerReady(event) {
        console.log('✅ YouTube player ready');
        // No automatic tracking event fired here.
    }

    function onPlayerStateChange(event) {
        const states = {
            '-1': 'unstarted',
            '0': 'ended',
            '1': 'playing',
            '2': 'paused',
            '3': 'buffering',
            '5': 'cued'
        };
        const state = states[event.data];
        console.log('📺 Video state changed:', state);
        // No auto tracking or dataLayer pushes in this project request.

        if (state === 'playing') {
            trackVideoProgress();
        }
    }

    function trackVideoProgress() {
        if (!player || !player.getDuration) return;

        const duration = player.getDuration();
        const milestones = [25, 50, 75, 90];

        const progressInterval = setInterval(function() {
            if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                clearInterval(progressInterval);
                return;
            }

            const currentTime = player.getCurrentTime();
            const progressPercent = (duration ? (currentTime / duration) * 100 : 0);

            milestones.forEach(milestone => {
                if (progressPercent >= milestone && !player[`milestone_${milestone}_tracked`]) {
                    player[`milestone_${milestone}_tracked`] = true;
                    console.log(`📊 Video progress: ${milestone}%`);
                }
            });
        }, 1000);
    }

    function onPlayerError(event) {
        console.error('❌ YouTube player error:', event.data);
        // No auto tracking event fired here.
    }

    window.LS_YouTubePlayer = {
        getPlayer: function() { return player; },
        playVideo: function() { if (player) player.playVideo(); },
        pauseVideo: function() { if (player) player.pauseVideo(); },
        stopVideo: function() { if (player) player.stopVideo(); }
    };
})();
