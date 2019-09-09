export const extractErrorMessage = (err: any) => {
  console.warn(err);
  let errMessage = err.response.data.message;

  if (err.response.data.errors) {
    const errors = err.response.data.errors;
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errMessage += errors[key];

      }
    }
  }

  return errMessage;
}