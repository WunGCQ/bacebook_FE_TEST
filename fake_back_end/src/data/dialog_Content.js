import users from './user';
export default {
  users:{
    '2': users.users[1],
  },
  messages:[
    {
      from: 2,
      contentType: 'text',
      content: 'hello world hello world 中西文混合试试',
      time: new Date(),
    },
    {
      from: 2,
      contentType: 'text',
      content: 'hello world 2',
      time: new Date(),
    },
    {
      from: 2,
      contentType: 'text',
      content: '果伸缩项目的行内轴与侧轴为同一条，则该值和flex-start等效。其它情况下，该值将参与基线对齐。所有参与该对齐方式的伸缩项目将按下列方式排列：首先将这些伸缩项目的基线进行对齐，随后其中基线至侧轴起点边的外边距距离最长的那个项目将紧靠住该行在侧轴起点的边。',
      time: new Date(),
    },
    {
      from: 2,
      contentType: 'image',
      content: users.users[1].avatar,
      time: new Date(),
    },
  ]
}
