import * as socketUtils from '../utils/socketUtils';
import * as constants from '../constants';

export default function socketMiddleware()
{
  return store => next => action =>
  {
    switch(action.type)
    {
      case constants.ACTION_SOCKET_CONNECT: socketUtils.initSocketConn(action.token, action.userid, store);
                                            break;

      case constants.ACTION_SOCKET_CLOSE:   socketUtils.closeSocketConn();
                                            break;

      default:                              return next(action);
    }
  }
}
