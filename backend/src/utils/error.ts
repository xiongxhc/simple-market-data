class BaseError extends Error {
  public readonly name: string;

  constructor(name: string) {
    super(name);
    this.name = name;
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(name = "APIError") {
    super(name);
  }
}

export class UnableToGetDataError extends BaseError {
  constructor(name = "UnableToGetDataError") {
    super(name);
  }
}
