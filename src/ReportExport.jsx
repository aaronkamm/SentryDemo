import { useState } from 'react';
import * as Sentry from '@sentry/react';

function ReportExport() {
  const [reportName, setReportName] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleExport = (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      if (simulateError) {
        throw new Error('Simulated crash on submit');
      }
      // Simulate export
      alert(`Exporting ${reportName}`);
    } catch (err) {
      Sentry.captureException(err); // Capture error in Sentry
      console.error('Error during export:', err); // Log for developer visibility
      setErrorMessage(`Error captured by Sentry: ${err.message}`); // Set state for user feedback
      // Do NOT re-throw
    }
  };
  return (
    <div className="container">
      <h1>Enterprise Reporting Dashboard</h1>
      <div className="input-container">
        <form onSubmit={handleExport}>
          <input
            placeholder="Enter report name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
          <button type="submit">Export Report</button>
          <div>
            <label>
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
              />
              Simulate error (for Sentry demo)
            </label>
          </div>
          {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReportExport;
