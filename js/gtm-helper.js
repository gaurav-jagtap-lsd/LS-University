// GTM Helper Functions
// This file contains utility functions for working with Google Tag Manager

/**
 * Push an event to the GTM Data Layer
 * @param {string} eventName - The name of the event
 * @param {object} eventData - The data associated with the event
 */
function pushGTMEvent(eventName, eventData = {}) {
    try {
        if (window.dataLayer === undefined) {
            window.dataLayer = [];
            console.warn('⚠️ dataLayer was undefined, creating new one');
        }
        
        const eventPayload = {
            event: eventName,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            ...eventData
        };
        
        window.dataLayer.push(eventPayload);
        console.log('✅ Event pushed to GTM:', eventPayload);
    } catch(error) {
        console.error('❌ Error pushing event to GTM:', error);
    }
}

/**
 * Get the current page information
 * @returns {object} Page information including title, URL, and path
 */
function getPageInfo() {
    return {
        page_title: document.title,
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_hostname: window.location.hostname
    };
}

/**
 * Get the data layer value
 * @param {string} key - The key to retrieve from the data layer
 * @returns {*} The value from the data layer
 */
function getDataLayerValue(key) {
    return window.dataLayer && window.dataLayer[key];
}

/**
 * Set a custom user property
 * @param {string} property - The property name
 * @param {*} value - The property value
 */
function setUserProperty(property, value) {
    if (window.dataLayer === undefined) {
        window.dataLayer = [];
    }
    
    const userProperty = {
        event: 'user_property',
        [property]: value
    };
    
    window.dataLayer.push(userProperty);
}

/**
 * Get user session information
 * @returns {object} Session information
 */
function getSessionInfo() {
    return {
        session_id: localStorage.getItem('session_id') || generateSessionId(),
        session_start: localStorage.getItem('session_start') || new Date().toISOString()
    };
}

/**
 * Generate a unique session ID
 * @returns {string} Unique session ID
 */
function generateSessionId() {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('session_id', sessionId);
    localStorage.setItem('session_start', new Date().toISOString());
    return sessionId;
}

/**
 * Track custom event with metadata
 * @param {string} eventName - Event name
 * @param {object} metadata - Event metadata
 */
function trackCustomEvent(eventName, metadata = {}) {
    try {
        const eventData = {
            ...getPageInfo(),
            ...getSessionInfo(),
            ...metadata
        };
        
        pushGTMEvent(eventName, eventData);
    } catch(error) {
        console.error('❌ Error tracking custom event:', error);
    }
}
