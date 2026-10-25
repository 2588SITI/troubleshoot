import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Manage Service Worker registration safely
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // If in dev environment or iframe, ensure any old stale service worker is cleared
  const isDev = (import.meta as any).env?.DEV;
  let inIframe = false;
  try {
    inIframe = window.self !== window.top;
  } catch (e) {
    inIframe = true;
  }

  if (isDev || inIframe) {
    // Unregister stale service worker to prevent intercepting live Vite dev modules
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {});
      }
    }).catch(() => {});
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
