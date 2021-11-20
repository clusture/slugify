import slugify from 'slugify';

import { StringIndexable } from './common.model';

const HYPHEN = 'xyzhyphenxyz';

const getSlug = (txt: string) => {
  const preps = ['of', 'with', 'at', 'from', 'into', 'to', 'in', 'for', 'on', 'by', 'up'];
  const conjs = ['and', 'so', 'but', 'or', 'as', 'if', 'that'];
  const articles = ['a', 'an', 'the'];
  const others: string[] = [];

  let whiteList = others.concat(preps);
  whiteList = whiteList.concat(conjs);
  whiteList = whiteList.concat(articles);

  const whiteFirst = [...articles];

  const mapper: StringIndexable = {
    introduction: 'intro',
    algorithm: 'algo',
    equation: 'eqn',
    solution: 'soln',
    function: 'func',
    property: 'prop',
    properties: 'props',
    maximum: 'max',
    minimum: 'min',
  };

  txt = txt.toLowerCase();
  txt = txt.replaceAll('-', HYPHEN);
  txt = txt.replaceAll('how to ', ' ');
  txt = txt.replaceAll("'s ", ' ');

  let slug = slugify(txt, {
    lower: true,
    strict: true,
  });

  let slugParts = slug.split('-');

  // Remove whiteList words, except when it's not a whiteFirst word at first place
  // e.g. foo-on-bar ==> foo-bar
  // e.g. on-foo-bar ==> on-foo-bar
  // e.g. the-foo-bar ==> foo-bar
  slugParts = slugParts.filter((p, i) => (!i && !whiteFirst.includes(p)) || !whiteList.includes(p));

  slugParts = slugParts.map(p => p.replaceAll(HYPHEN, '-'));
  slugParts = slugParts.map(p => (p.startsWith('-') ? p.replaceAll('-', '') : p));
  slugParts = slugParts.map(p => (p.endsWith('-') ? p.replaceAll('-', '') : p));
  slugParts = slugParts.filter(p => !!p);

  slug = slugParts.join('-');

  slugParts = slug.split('-');
  slugParts = slugParts.map(p => {
    const matched = Object.keys(mapper).find(k => p.startsWith(k));
    return matched ? mapper[matched] : p;
  });
  if (slugParts[0] === 'intro') {
    slugParts.splice(0, 1);
    slugParts.push('intro');
  }
  slug = slugParts.join('-');

  return slug;
};

export default getSlug;
