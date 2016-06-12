import config from '../../config';
/**
 * Created by wungcq on 16/5/15.
 */
console.log(config.rootUrl);
export default {
  users:[
    {
      id: 1,
      username : '老中医',
      avatar : config.rootUrl+'/img/me.JPG',
      head_id: 'head_1',
    },
    {
      id: 2,
      username : 'saazm',
      avatar : config.rootUrl+'/img/szm.jpg',
      head_id : 'head_2',
    },
    {
      id: 3,
      username : 'xsf',
      avatar : config.rootUrl+'/img/xsf.jpg',
      head_id: 'head_3',
    },
  ],
  me:{
    id: 1,
    username : '老中医',
    avatar : config.rootUrl+'/img/me.JPG',
    head_id : 'head_1',
  }
}
