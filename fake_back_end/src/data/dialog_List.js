import USER from './user';
export default {
  dialogs: [
    {
      id: 1,
      group: false,
      from: USER.users[1],
      overview: 'hello word!',
      lastTime: new Date().toString(),
    },
    {
      id: 2,
      group: false,
      from: USER.users[2],
      overview: 'hello word 2!',
      lastTime: new Date().toString(),
    },
  ]
}
