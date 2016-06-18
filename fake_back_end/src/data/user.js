import config from '../../config';
/**
 * Created by wungcq on 16/5/15.
 */
export default {
  users:[
    {
      id: 1,
      username : '老中医',
      telephone: '12332112345',
      avatar : config.rootUrl+'/img/me.JPG',
      head_id: 'head_1',
      status: 'accepted',
    },
    {
      id: 2,
      telephone: '12332112345',
      username : 'saazm',
      head_id : 'head_2',
      status: 'waiting',
    },
    {
      id: 3,
      telephone: '12332112345',
      username : 'xsf',
      head_id: 'head_3',
      status: 'accepted',
    },
    {
      id: 4,
      telephone: '12332112345',
      username : '术士',
      head_id: 'head_4',
      status: 'rejected',
    },
  ],
  me:{
    id: 1,
    telephone: '12332112345',
    username : '老中医',
    avatar : config.rootUrl+'/img/me.JPG',
    head_id : 'head_1',
  }
}
