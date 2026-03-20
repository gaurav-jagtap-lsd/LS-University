/**
 * Session Management Utility
 * Handles session initialization and persistence using localStorage
 * This file must be loaded before any other tracking scripts
 */

(function() {
    'use strict';

    /**
     * Initialize or restore session
     */
    function initializeSession() {
        let sessionId = localStorage.getItem('session_id');
        let sessionStart = localStorage.getItem('session_start');

        if (!sessionId) {
            // Create new session
            sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            sessionStart = new Date().toISOString();
            localStorage.setItem('session_id', sessionId);
            localStorage.setItem('session_start', sessionStart);
            console.log('✅ New session created:', sessionId);
        } else {
            console.log('✅ Session restored:', sessionId);
        }

        // Session initialization tracking is disabled (manual implementation only)

        return {
            id: sessionId,
            start: sessionStart
        };
    }

    /**
     * Get current session info
     */
    function getSession() {
        return {
            id: localStorage.getItem('session_id'),
            start: localStorage.getItem('session_start')
        };
    }

    // Initialize session when script loads
    const session = initializeSession();

    // Export to global scope for use in other scripts
    window.LS_SESSION = {
        get: getSession,
        id: session.id,
        start: session.start
    };

})();
