export function isValidObjectId(id: string): boolean {
    // MongoDB ObjectID is a 24-character hex string
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  }