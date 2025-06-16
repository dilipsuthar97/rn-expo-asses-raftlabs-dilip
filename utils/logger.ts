export const logger = (message: any) => {
  if (__DEV__ || process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};
