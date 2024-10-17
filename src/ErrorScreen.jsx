const ErrorScreen = ({ error, resetErrorBoundary }) => {
  return (
    <div className="app-container">
      <div className="error main-content">
        <h3>We are sorry, something went wrong</h3>
        <p>
          We cannot process your request at this moment. Please try again later.
        </p>
        <p>ERROR: {error.message}</p>
        <p>{error.component}</p>
        <div className="button button-cta" onClick={resetErrorBoundary}>
          Try Again
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
