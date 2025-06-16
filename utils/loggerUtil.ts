/**
 * method to log messages to the console for debugging purposes
 * @param message
 */
export const logger = (message?: any, ...optionalParams: any[]) => {
  if (__DEV__ || process.env.NODE_ENV === 'development') {
    console.log(message, ...optionalParams);
  }
};
