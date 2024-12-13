export function trackEvent(eventName, eventData) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}