export interface ClerkError {
    status: number;
    clerkTraceId: string;
    clerkError: boolean;
    errors: {
      code: string;
      message: string;
      longMessage: string;
      meta?: Record<string, unknown>;
    }[];
  }
  
  export function isClerkAPIResponseError(error: unknown): error is ClerkError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'clerkError' in error &&
      (error as ClerkError).clerkError === true
    );
  }