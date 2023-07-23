const catchAsyncErrors = (theFunc) => () => {
  Promise.resolve(theFunc()).catch(next);
};

export default catchAsyncErrors;
