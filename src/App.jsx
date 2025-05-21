import { Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import BookList from './BookList';
import ReportExport from './ReportExport';
import './App.css';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  return (
    // <SentryRoutes>
    //   <Route path="/" element={<ReportExport />} />
    //   <Route path="/book-list" element={<BookList />} />
    // </SentryRoutes>
    <div>
      <ReportExport />
      <BookList />
    </div>
  );
}

export default Sentry.withProfiler(App);
