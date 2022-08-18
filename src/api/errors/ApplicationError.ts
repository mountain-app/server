class ApplicationError extends Error {
  public status: number;

  constructor(message?: string, status?: number) {
    super();

    Error.captureStackTrace(this, ApplicationError);

    this.name = 'ApplicationError';
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || 500;
  }
}

export default ApplicationError;
