const TpltonPeck = require('../index');
const configuration = require('./configuration');

describe('Test template', () => {
  it('should be good', () => {
    const htmlTemplate = TpltonPeck({
      rootURL: './tests/templates',
      type: 'html',
      main: 'index',
      partials: configuration.partials,
      texts: {
        ...configuration.global,
        ...configuration.texts
      },
      chuncks: configuration.chuncks
    });
    expect(htmlTemplate.length).toBeDefined();
  });
});
