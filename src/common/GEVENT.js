import {EventEmitter2} from 'eventemitter2';
let GEVENT = new EventEmitter2({

      //
      // set this to `true` to use wildcards. It defaults to `false`.
      //
      wildcard: false,

      //
      // the delimiter used to segment namespaces, defaults to `.`.
      //
      delimiter: '.',
      //
      // set this to `true` if you want to emit the newListener event. The default value is `true`.
      //
      newListener: true,
      //
      // the maximum amount of listeners that can be assigned to an event, default 10.
      //
      maxListeners: 20
});

export default GEVENT;
