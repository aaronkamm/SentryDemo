import { useState } from 'react';
import * as Sentry from '@sentry/react';
import PerformanceDemo from './PerformanceMonitoring';

function App() {
  const [reportName, setReportName] = useState('');

  const handleExport = () => {
    try {
      if (!reportName) {
        throw new Error('Missing report name');
      }
      // Simulate export
      alert(`Exporting ${reportName}`);
    } catch (err) {
      Sentry.captureException(err);
      throw err; // Re-throw to show unhandled error
    }
  };

  return (
    <div className="container">
      <h1>Enterprise Reporting Dashboard</h1>
      <input
        placeholder="Enter report name"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
      />
      <button onClick={handleExport}>Export Report</button>
      <PerformanceDemo />
    </div>
  );
}

export default Sentry.withProfiler(App);
