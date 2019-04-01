import { get } from 'lodash';
import * as AT from './../../actionTypes';
import { setLoader } from '../loaders/loaders.actions';
import { getShowInfo, setModalState, setShowInfo } from './showInfo.actions';
import createMiddleware from './../../utils/middlewareHelper';

const { SHOW_INFO } = AT;

const middleware = ({ action, dispatch, getState }) => {
  const { payload, type } = action;
  switch (type) {
    case AT.OPEN_SHOW_INFO_MODAL: {
      const id = payload;

      dispatch([
        setModalState({ state: true }),
        setLoader({ name: 'showInfo', state: true }),
        getShowInfo({ id }),
      ]);
    }
      break;

    case AT.GET_SHOW_INFO.SUCCESS: {
      const show = payload.data;
      dispatch([
        setLoader({ name: 'showInfo', state: false }),
        setShowInfo({ show }),
      ]);
    }
      break;

    default:
    // do nothing
  }
};

export default createMiddleware({
  feature: SHOW_INFO,
})(middleware);