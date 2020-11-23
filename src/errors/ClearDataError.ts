export default class ClearDataError extends Error {
  constructor() {
    super('An error occured while clearing local JSON data.');
      
    this.name  = 'ClearDataError';
  }
}
