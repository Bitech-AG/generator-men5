# generator-men5 <!--[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]-->
> generates fullstack projects with **M**ongodb, **E**xpressjs, **N**odejs and openUi**5** (men5 stack). 
> All components of the stack are open source and free to use for any purpose. With the OpneUi5 framework, hundreds of UI components are available to you.

## Requirements

Tested with node version 18.17.0.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-men5 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-men5
```

Then generate your new project:

```bash
mkdir your-project-folder
cd your-project-folder
yo men5
```
The generated project contains an OData service with the example entity 'book'. You can extend the OData service with the sub-generators.

## Sub-generators

All sub-generators can be accessed in the root directory of the project.

Entity
```bash
yo men5:entity
```
Singleton
```bash
yo men5:entity --singleton
```
Action
```bash
yo men5:action
```

Function
```bash
yo men5:function
```

## Getting To Know Komponents Of The Stack

  * [**M**ongoosejs](https://mongoosejs.com/) Javascript driver for the MongoDB database
  * [**E**xpressjs](https://expressjs.com/de/) Nodejs express web server
  * [**N**odejs](https://nodejs.org/de) Engine for server-side JavaScript
  * [OpenUi**5**](https://openui5.hana.ondemand.com/) Framework

You can find further helpful information at:
* [OData protocol](https://www.odata.org/) OASIS Definition of Open Data Protocol
* [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/) Installation Guide

## How to obtain support

Please use the GitHub bug tracking system to post questions, bug reports or to create pull requests.

## Other generators

If you want to create a library type project, you can only do this with the [easy-ui5 generator](https://www.npmjs.com/package/generator-easy-ui5). 

## License

[MIT](LICENSE)

 © [Richard Martens](https://www.bitech.ag)


[npm-image]: https://badge.fury.io/js/generator-men5.svg
[npm-url]: https://npmjs.org/package/generator-men5
[travis-image]: https://travis-ci.com/bitech-ag/generator-men5.svg?branch=master
[travis-url]: https://travis-ci.com/bitech-ag/generator-men5
[daviddm-image]: https://david-dm.org/bitech-ag/generator-men5.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bitech-ag/generator-men5
[coveralls-image]: https://coveralls.io/repos/bitech-ag/generator-men5/badge.svg
[coveralls-url]: https://coveralls.io/r/bitech-ag/generator-men5

<!--
- Enable Travis integration at https://travis-ci.com/profile/bitech-ag
- Enable Coveralls integration at https://coveralls.io/repos/new
-->
