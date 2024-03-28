export class ApiError extends Error {
  status: number;
  errors: Iterable<any>;
  constructor(status: number, message: string, errors: Iterable<any> = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User not authorized');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static BadPermission(message = 'No permission', errors = []) {
    return new ApiError(401, message, errors);
  }
}
