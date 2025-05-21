import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import {
//   BrowserRouter,
//   Routes,
//   useLocation,
//   useNavigationType,
//   createRoutesFromChildren,
//   matchRoutes
// } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import App from './App.jsx';

Sentry.init({
  dsn: 'https://b0eb2c60728c8e42287fb1c3a9b94b8f@o4509318659244032.ingest.us.sentry.io/4509318669271040',
  integrations: [
    // Sentry.reactRouterV6BrowserTracingIntegration({
    //   useEffect: useEffect,
    //   useLocation,
    //   useNavigationType,
    //   createRoutesFromChildren,
    //   matchRoutes
    // }),
    Sentry.browserTracingIntegration,
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration({
      // Additional SDK configuration goes in here, for example:
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  tracePropagationTargets: [/^http:\/\/localhost:\d+/],
  environment: import.meta.env.VITE_SENTRY_ENV || 'development',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});
createRoot(document.getElementById('root'), {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler()
}).render(
  <StrictMode>
    {/* <BrowserRouter basename="/"> */}
    <App />
    {/* </BrowserRouter> */}
  </StrictMode>
);
