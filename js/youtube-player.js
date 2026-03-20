/**
 * YouTube Player Integration with GA4/GTM Tracking
 * Handles YouTube video player initialization and event tracking
 */

(function() {
    'use strict';

    console.log('🎥 YouTube Player Integration loaded');

    // YouTube Player variables
    let player;
    const videoId = '8vRjYw2O4Zo'; // The video ID from the URL

    // Initialize player when YouTube API is ready
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: videoId,
            playerVars: {
                'playsinline': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3,
                'fs': 1,
                'cc_load_policy': 0,
                'disablekb': 0,
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    };

    // Player ready callback
    function onPlayerReady(event) {
        console.log('✅ YouTube player ready');

        // Track player ready event
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'video_ready',
                'video_id': videoId,
                'video_title': 'LS University Introduction',
                'video_provider': 'youtube'
            });
        }
    }

    // Player state change callback
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

        // Track video engagement events
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'video_engagement',
                'video_action': state,
                'video_id': videoId,
                'video_title': 'LS University Introduction',
                'video_provider': 'youtube',
                'video_current_time': player.getCurrentTime ? Math.floor(player.getCurrentTime()) : 0,
                'video_duration': player.getDuration ? Math.floor(player.getDuration()) : 0
            });
        }

        // Track specific milestones
        if (state === 'playing') {
            trackVideoProgress();
        }
    }

    // Track video progress milestones
    function trackVideoProgress() {
        if (!player || !player.getDuration) return;

        const duration = player.getDuration();
        const milestones = [25, 50, 75, 90];

        // Check progress every second while playing
        const progressInterval = setInterval(function() {
            if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                clearInterval(progressInterval);
                return;
            }

            const currentTime = player.getCurrentTime();
            const progressPercent = (currentTime / duration) * 100;

            milestones.forEach(milestone => {
                if (progressPercent >= milestone && !player[`milestone_${milestone}_tracked`]) {
                    player[`milestone_${milestone}_tracked`] = true;

                    if (window.dataLayer) {
                        window.dataLayer.push({
                            'event': 'video_progress',
                            'video_progress': milestone,
                            'video_id': videoId,
                            'video_title': 'LS University Introduction',
                            'video_provider': 'youtube'
                        });
                    }

                    console.log(`📊 Video progress: ${milestone}%`);
                }
            });
        }, 1000);
    }

    // Player error callback
    function onPlayerError(event) {
        console.error('❌ YouTube player error:', event.data);

        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'video_error',
                'video_id': videoId,
                'video_error_code': event.data,
                'video_provider': 'youtube'
            });
        }
    }

    // Make player available globally for debugging
    window.LS_YouTubePlayer = {
        getPlayer: function() { return player; },
        playVideo: function() { if (player) player.playVideo(); },
        pauseVideo: function() { if (player) player.pauseVideo(); },
        stopVideo: function() { if (player) player.stopVideo(); }
    };

})();