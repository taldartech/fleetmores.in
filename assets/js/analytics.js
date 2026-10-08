/**
 * FLEETMORES — Analytics & Conversion Event Hooks
 */
(function () {
  'use strict';

  window.FleetMoresAnalytics = {
    track: function (eventName, eventProps) {
      const payload = {
        event: eventName,
        timestamp: new Date().toISOString(),
        properties: eventProps || {},
        page: window.location.pathname
      };

      // Push to GTM dataLayer if present
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);

      // Console debug log for testing
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('[FleetMores Analytics]', payload);
      }
    }
  };
})();
