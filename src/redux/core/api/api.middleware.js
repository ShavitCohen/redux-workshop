import { isEmpty, get } from 'lodash';
import qs from 'qs';
import axios from 'axios';
import createMiddleware from './../../utils/middlewareHelper';

import { apiError, apiSuccess } from './api.middleware.actions';
import * as AT from '../../actionTypes';

const middleware = () => {};

const goThroughOverride = async ({ dispatch, action }) => {
  if (action.type.includes(AT.API_REQUEST)) {
    const { url, feature, sourceAction } = action.meta;
    const method = action.meta.method.toLowerCase();
    const data = action.payload;

    const options = {
      method: method,
      url,
    };

    if (method !== 'get' && data) {
      options.data = data;
    }

    if (method === 'get' && data && !isEmpty(data)) {
      options.url = `${url}?${qs.stringify(data)}`;
    }

    try {
      const res = await axios(options);
      const response = { res, sourceAction, meta: action.meta };
      dispatch(apiSuccess(response));
    } catch (err) {
      const error = { ...err.response, message: get(err, 'response.data.message') || 'Error' };
      dispatch(apiError({ error, sourceAction, meta: action.meta }));
    }
  }
};

export default createMiddleware({
  feature: '',
  goThroughOverride,
})(middleware);