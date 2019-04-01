import createMiddleware from './../utils/middlewareHelper';

const middleware = () => {};

const nextOverride = ({ next, action }) => {
  if (Array.isArray(action)) {
    action.forEach(_action => next(_action));
  } else {
    next(action);
  }
};

export default createMiddleware({
  feature: '',
  nextOverride,
})(middleware);