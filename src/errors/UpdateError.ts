export default class UpdateError extends Error {
  constructor() {
    super('An error occured while updating.');
    
    this.name  = 'UpdateError';
  }
}
