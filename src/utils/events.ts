// Utility functions for event handling

/**
 * Dispatches a token changed event to notify components that the authentication token has changed
 */
export function dispatchTokenChangedEvent() {
  try {
    // Dispatch on both window and document for maximum compatibility
    const windowEvent = new CustomEvent('token-changed', { bubbles: true });
    window.dispatchEvent(windowEvent);
    
    const documentEvent = new CustomEvent('token-changed', { bubbles: true });
    document.dispatchEvent(documentEvent);
    
    // Also trigger a storage event for cross-tab communication
    const timestamp = Date.now().toString();
    localStorage.setItem('_event_trigger', timestamp);
    localStorage.removeItem('_event_trigger');
  } catch (error) {
    // Silent error handling
  }
} 