import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'

const _parse = (array, ending) => {
  let result = [];
  let buffer = "";
  let char = array.pop();
  let i=0;
  while (true) {
    if (char == ending) {
      result.push(buffer);
      return result;
    }
    else if (['*', '_'].includes(char)) {
      if (buffer) {
        result.push(buffer);
        buffer = "";
      }
      const inner = _parse(array, char);
      if (char == "*") {
        result.push(
          <strong key={i++}>{inner}</strong>
        );
      }
      else if (char == "_") {
        result.push(
          <em key={i++}>{inner}</em>
        );
      }
    }
    else {
      buffer += char;
    }
    char = array.pop();
  }
}

const parse = (str) => {
  if (str == null) {
    return null;
  }
  const array = str.split("").reverse();
  return _parse(array);
}

const parseMove = (text) => !text ? "" : text
  .replace(/ *\n */g, "\n")
  .split("\n\n")
  .map(parse)
  .map((p, i) => <p key={i}>{p}</p>);

export default parseMove;