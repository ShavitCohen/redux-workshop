export default ({ feature = '', goThroughOverride, nextOverride }) => fn => store => next => action => {
  const { dispatch, getState } = store;
  const middleWareArgumentsObj = { dispatch, getState, next, action };
  if (nextOverride) {
    nextOverride(middleWareArgumentsObj);
  } else {
    next(action);
  }
  const goThroughExpression = (goThroughOverride !== undefined) ?
    _getGoThroughOverrideExp(goThroughOverride, middleWareArgumentsObj) :
    (action.meta && action.meta.feature === feature);

  if (goThroughExpression) {
    fn(middleWareArgumentsObj);
  }
}

function _getGoThroughOverrideExp(goThroughOverride, middleWareArgumentsObj) {
  if (typeof (goThroughOverride) === 'function') {
    return goThroughOverride(middleWareArgumentsObj);
  }
  return goThroughOverride;
}