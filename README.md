# TpltonPeck

Light Template Engine - Templeton "Faceman" Peck

Based on the famous character name from ATeam Serie from the 80's, Templeton "Faceman" Peck,
here is a light template engine based on a short configuration and easy to modelise architecture (usefull for emails).

## Architecture

To use TpltonPeck, you must follow a certain architecture :

```shell
/<src>
  /chuncks
    /<type>
      /file.<type>
  /parials
    /<type>
      /file.<type>
  /file.<type>
```

Explanations :

- `src` is the folder you want to store your templates
- You must have a file.< type > where type is the type of your file (html, text, yaml...), you can set this value to `raw` to use raw text instead of a file template.

## Configuration

For each template, you must set a configuration.

`rootURL` {String} Mandatory : it's the main url for your templates folder. Can be relative.

`main` {String} Mandatory : The main template file, or, the content to format, if `type` is set to `raw`

`type` {String} Mandatory : This value depends of your template files. You can use either `html`, `text`, or all other file format you want to use. You can use `raw` to not use file, but use `main` as the text to format.

`texts` {Object} Mandatory : This value is an Object combining key/values. For each key inside the template, it will be replaced by its value. <br />
Use `%` symbol around your variable name inside your template to use it as a template variable.

```
%title%
%date%
%content%
%amountValue%
%policyholder_firstName%
```

<br />
Be aware that `texts` variables are treated in the last position in the treatment cue. So, if you want to add `partials` or `chuncks` inside the value of a `texts`, the key wil not be formated.

```javascript
const configuration = {
  ...
  texts: {
    key: "Here is a key that will not be %processed%"
  }
}
```

In the example above, `%processed%` will not be processed.

`partials` {Array} Optional : Partials are chunck of data you want to implement inside your `main` file.

**Be aware that you can't put a partial inside an another partial.**

Just put the partial file, inside your `partials/<type>/` directory with the proper `<type>` file extention.<br/>

You can add as many as you want `texts` variables inside a partial.

You must use the following notation inside your `main` template to specify to the template engine that you use a partial `%partial__...%` :

```html
<section>
  <section role="main">
    %partial__content%
  </section>
  <footer>
    %partial__footer%
  </footer>
</section>
```

You must prefix the name of your partial with `partial__`, and, as for the `texts` variable, add `%` around the variable name.

```html
%partial__< partialName >%
```

`chuncks` {Array} Optional :

Here is a html example

```javascript
const configuration = {
  rootURL: './templates',
  main: 'index',
  type: 'html',
  texts: {
    title: 'Page title',
    pageContent: 'Lorem Ipsum est dolor\nsit Amet est.'
  },
  partials: ['header', 'footer'],
  chuncks: [
    {
      name: 'chunckName',
      values: [
        {
          key: 'value'
        }
      ]
    }
  ]
};
```

Here is a text example

```javascript
const configuration = {
  rootURL: './templates',
  main: 'index',
  type: 'text',
  texts: {
    title: 'Page title',
    pageContent: 'Lorem Ipsum est dolor\nsit Amet est.'
  }
};
```

Here is a raw example

```javascript
const configuration = {
  rootURL: './templates',
  main: 'Links awakening on Nintendo Switch will be release on %date%',
  type: 'raw',
  texts: {
    date: 'September 20, 2019'
  }
};
```

## How to use

## Tests

```

```
