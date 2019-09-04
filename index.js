const fs = require('fs');
const path = require('path');

const readFile = filePath =>
  filePath && fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
/**
 *
 * @param {Object} configuration Configuration of the template, should contains properties listed below
 * Mandatory main {String} The name of the main file
 * Mandatory rootURL {String} The root url for files
 * Optional partials {Array} List of files name to implement inside the main tpl
 * Optional chuncks {Array} List of objects (key: function) function to be executed BEFORE text replacement. Each function must return a string;
 * Optional texts {Array} List of objects (key: value) Text to replace at the end of the process
 */
function TpltonPek(configuration) {
  console.time('TpltonPeck');
  // First step - load the main template
  let main = '';
  try {
    main =
      configuration.type !== 'raw'
        ? readFile(
            `${configuration.rootURL}/${configuration.main}.${configuration.type}`
          )
        : configuration.main;
    main =
      configuration.partials && configuration.partials.length > 0
        ? aggregatePartials(main, configuration)
        : main;
    main = configuration.chuncks ? aggregateChuncks(main, configuration) : main;
    main = configuration.texts ? aggregateTexts(main, configuration) : main;
  } catch (error) {
    throw new Error(error);
  }
  console.timeEnd('TpltonPeck');
  return main;
}

function aggregatePartials(main, configuration) {
  const { rootURL, type } = configuration;
  configuration.partials.forEach(name => {
    const partialContent = readFile(
      `${rootURL}/partials/${type}/${name}.${type}`
    );
    const regExp = new RegExp(`%partial__${name}%`, 'g');
    main = main.replace(regExp, partialContent);
  });
  return main;
}

function aggregateChuncks(main, configuration) {
  const { rootURL, type } = configuration;
  configuration.chuncks.forEach(chunck => {
    const partialContent = readFile(
      `${rootURL}/chuncks/${type}/${chunck.name}.${type}`
    );
    let wholeContent = '';
    chunck.values.forEach(valueObject => {
      let content = partialContent;
      Object.entries(valueObject).forEach(([key, value]) => {
        const regExp = new RegExp(`%${key}%`, 'g');
        content = content.replace(regExp, value);
      });
      wholeContent += content;
    });
    const regExp = new RegExp(`%chunck__${chunck.name}%`, 'g');
    main = main.replace(regExp, wholeContent);
  });
  return main;
}

function aggregateTexts(main, configuration) {
  const { rootURL, type } = configuration;
  Object.entries(configuration.texts).forEach(([key, value]) => {
    const regExp = new RegExp(`%${key}%`, 'g');
    console.log('TpltonPek aggregateTexts value', value);
    value =
      type === 'html' && typeof value === 'string'
        ? value.replace(/\n/g, '<br />')
        : value;
    main = main.replace(regExp, value);
  });
  return main;
}

module.exports = TpltonPek;
