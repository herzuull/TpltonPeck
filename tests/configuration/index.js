const moment = require('moment');

module.exports = {
  global: {
    title: 'Test title %date%',
    pageTitle: 'First Page'
  },
  partials: ['header', 'footer', 'content'],
  chuncks: [
    {
      name: 'table',
      values: [
        {
          columnOne: (Math.random() * 100).toFixed(2),
          columnTwo: (Math.random() * 100).toFixed(2),
          columnThree: (Math.random() * 100).toFixed(2)
        },
        {
          columnOne: (Math.random() * 100).toFixed(2),
          columnTwo: (Math.random() * 100).toFixed(2),
          columnThree: (Math.random() * 100).toFixed(2)
        },
        {
          columnOne: (Math.random() * 100).toFixed(2),
          columnTwo: (Math.random() * 100).toFixed(2),
          columnThree: (Math.random() * 100).toFixed(2)
        }
      ]
    }
  ],
  texts: {
    date: moment().format('LL'),
    someLoremIpsumContent: 'Lorem Ipsum est Dolor Sir\nAmet est.',
    copyright: `&copy; ${new Date().getFullYear()}`,
    subTitle: 'Here is a subtitle Example'
  }
};
