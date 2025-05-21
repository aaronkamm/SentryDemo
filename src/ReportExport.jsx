import { useState } from 'react';
import * as Sentry from '@sentry/react';

function ReportExport() {
  const [reportName, setReportName] = useState('');

  const handleExport = () => {
    try {
      if (reportName) {
        throw new Error('Simulated crash on submit');
      }
      // Simulate export
      alert(`Exporting ${reportName}`);
    } catch (err) {
      Sentry.captureException(err); // Capture error in Sentry
      throw err; // Throw to show unhandled error
    }
  };
  return (
    <div className="container">
      <h1>Enterprise Reporting Dashboard</h1>
      <div className="input-container">
        <form>
          <input
            placeholder="Enter report name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
          <button onClick={handleExport}>Export Report</button>
        </form>
      </div>
    </div>
  );
}

export default ReportExport;
