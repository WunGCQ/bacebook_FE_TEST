import Storage from 'react-native-storage';

var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 * 365秒）
  defaultExpires: 1000 * 3600 * 24 * 365,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync同步方法，无缝返回最新数据。
  sync : {
    // 同步方法的具体说明会在后文提到
  }
});

global.Storage = storage;
export function setItem(key,value,id){
    var arg = {
    key: key,  //注意:请不要在key中使用_下划线符号!
    rawData: value,
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: null
  };
  if(id) arg.id = id;
  return storage.save(arg);
}

export function getItem(key,id){
  var arg = {
    autoSync: true,
    syncInBackground: true,
  };
  if(key) arg.key = key;
  if(id) arg.id = id;
  return storage.load(arg);
}
