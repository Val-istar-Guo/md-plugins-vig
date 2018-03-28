import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, image } from '../src';


const plainImage = '![alt text](www.image.link)'
const imageWithTitleUseDoubleQuotes = '![alt text](www.image.link "image title")'
const imageWithTitleUseSigleQuotes = "![alt text](www.image.link 'image title')"
const emptyImage = '![]()';
const imageNoAlt = '![](www.image.link)';
const imageNoAltButHaveTitle = '![](www.image.link "image title")';

describe('# image', function () {
  const parse = md({ placeholder: '#' })
    .use(normalize())
    .use(paragraph())
    .use(image())
    .parse

  it(`should parse ${emptyImage}`, function () {
    expect(parse(emptyImage).toHTML())
      .to.equal('<p><img src="#" /></p>')
  })

  it(`should parse ${plainImage}`, function () {
    expect(parse(plainImage).toHTML())
      .to.equal('<p><img alt="alt text" src="www.image.link" /></p>')
  })

  it(`should parse ${imageWithTitleUseDoubleQuotes}`, function () {
    expect(parse(imageWithTitleUseDoubleQuotes).toHTML())
      .to.equal('<p><img alt="alt text" src="www.image.link" title="image title" /></p>')
  })

  it(`should parse ${imageWithTitleUseSigleQuotes}`, function () {
    expect(parse(imageWithTitleUseSigleQuotes).toHTML())
      .to.equal('<p><img alt="alt text" src="www.image.link" title="image title" /></p>')
  })

  it(`should parse ${imageNoAlt}`, function () {
    expect(parse(imageNoAlt).toHTML())
      .to.equal('<p><img src="www.image.link" /></p>')
  })

  it(`should parse ${imageNoAltButHaveTitle}`, function () {
    expect(parse(imageNoAltButHaveTitle).toHTML())
      .to.equal('<p><img src="www.image.link" title="image title" /></p>')
  })
})


