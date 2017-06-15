import { A } from 'ember-array/utils';
import get from 'ember-metal/get';

export function isGroup(entry) {
  return !!entry && !!get(entry, 'groupName') && !!get(entry, 'options');
}

export function countOptions(collection) {
  let counter = 0;
  (function walk(collection) {
    if (!collection) {
      return null;
    }
    for (let i = 0; i < get(collection, 'length'); i++) {
      let entry = collection.objectAt ? collection.objectAt(i) : collection[i];
      if (isGroup(entry)) {
        walk(get(entry, 'options'));
      } else {
        counter++;
      }
    }
  })(collection);
  return counter;
}

export function indexOfOption(collection, option) {
  let index = 0;
  return (function walk(collection) {
    if (!collection) {
      return null;
    }
    for (let i = 0; i < get(collection, 'length'); i++) {
      let entry = collection.objectAt ? collection.objectAt(i) : collection[i];
      if (isGroup(entry)) {
        let result = walk(get(entry, 'options'));
        if (result > -1) {
          return result;
        }
      } else if (entry === option) {
        return index;
      } else {
        index++;
      }
    }
    return -1;
  })(collection);
}

export function optionAtIndex(originalCollection, index) {
  let counter = 0;
  return (function walk(collection, ancestorIsDisabled) {
    if (!collection || index < 0) {
      return { disabled: false, option: undefined };
    }
    let localCounter = 0;
    let length = get(collection, 'length');
    while (counter <= index && localCounter < length) {
      let entry = collection.objectAt ? collection.objectAt(localCounter) : collection[localCounter];
      if (isGroup(entry)) {
        let found = walk(get(entry, 'options'), ancestorIsDisabled || !!get(entry, 'disabled'));
        if (found) {
          return found;
        }
      } else if (counter === index) {
        return { disabled: ancestorIsDisabled || !!get(entry, 'disabled'), option: entry };
      } else {
        counter++;
      }
      localCounter++;
    }
  })(originalCollection, false) || { disabled: false, option: undefined };
}

export function filterOptions(options, text, matcher, skipDisabled = false) {
  let opts = A();
  let length = get(options, 'length');
  for (let i = 0; i < length; i++) {
    let entry = options.objectAt ? options.objectAt(i) : options[i];
    if (!skipDisabled || !get(entry, 'disabled')) {
      if (isGroup(entry)) {
        let suboptions = filterOptions(get(entry, 'options'), text, matcher, skipDisabled);
        if (get(suboptions, 'length') > 0) {
          let groupCopy = { groupName: entry.groupName, options: suboptions };
          if (entry.hasOwnProperty('disabled')) {
            groupCopy.disabled = entry.disabled;
          }
          opts.push(groupCopy);
        }
      } else if (matcher(entry, text) >= 0) {
        opts.push(entry);
      }
    }
  }
  return opts;
}

export function defaultHighlighted(select) {
  let { results, highlighted, selected } = select;
  let option = highlighted || selected;
  if (option === undefined || indexOfOption(results, option) === -1) {
    return advanceSelectableOption(results, option, 1);
  }
  return option;
}

export function advanceSelectableOption(options, currentOption, step) {
  let resultsLength = countOptions(options);
  let startIndex = Math.min(Math.max(indexOfOption(options, currentOption) + step, 0), resultsLength - 1);
  let { disabled, option } = optionAtIndex(options, startIndex);
  while (option && disabled) {
    let next = optionAtIndex(options, startIndex += step);
    disabled = next.disabled;
    option = next.option;
  }
  return option;
}

const DIACRITICS = {
  'Ⓐ': 'A',
  'Ａ': 'A',
  'À': 'A',
  'Á': 'A',
  'Â': 'A',
  'Ầ': 'A',
  'Ấ': 'A',
  'Ẫ': 'A',
  'Ẩ': 'A',
  'Ã': 'A',
  'Ā': 'A',
  'Ă': 'A',
  'Ằ': 'A',
  'Ắ': 'A',
  'Ẵ': 'A',
  'Ẳ': 'A',
  'Ȧ': 'A',
  'Ǡ': 'A',
  'Ä': 'A',
  'Ǟ': 'A',
  'Ả': 'A',
  'Å': 'A',
  'Ǻ': 'A',
  'Ǎ': 'A',
  'Ȁ': 'A',
  'Ȃ': 'A',
  'Ạ': 'A',
  'Ậ': 'A',
  'Ặ': 'A',
  'Ḁ': 'A',
  'Ą': 'A',
  'Ⱥ': 'A',
  'Ɐ': 'A',
  'Ꜳ': 'AA',
  'Æ': 'AE',
  'Ǽ': 'AE',
  'Ǣ': 'AE',
  'Ꜵ': 'AO',
  'Ꜷ': 'AU',
  'Ꜹ': 'AV',
  'Ꜻ': 'AV',
  'Ꜽ': 'AY',
  'Ⓑ': 'B',
  'Ｂ': 'B',
  'Ḃ': 'B',
  'Ḅ': 'B',
  'Ḇ': 'B',
  'Ƀ': 'B',
  'Ƃ': 'B',
  'Ɓ': 'B',
  'Ⓒ': 'C',
  'Ｃ': 'C',
  'Ć': 'C',
  'Ĉ': 'C',
  'Ċ': 'C',
  'Č': 'C',
  'Ç': 'C',
  'Ḉ': 'C',
  'Ƈ': 'C',
  'Ȼ': 'C',
  'Ꜿ': 'C',
  'Ⓓ': 'D',
  'Ｄ': 'D',
  'Ḋ': 'D',
  'Ď': 'D',
  'Ḍ': 'D',
  'Ḑ': 'D',
  'Ḓ': 'D',
  'Ḏ': 'D',
  'Đ': 'D',
  'Ƌ': 'D',
  'Ɗ': 'D',
  'Ɖ': 'D',
  'Ꝺ': 'D',
  'Ǳ': 'DZ',
  'Ǆ': 'DZ',
  'ǲ': 'Dz',
  'ǅ': 'Dz',
  'Ⓔ': 'E',
  'Ｅ': 'E',
  'È': 'E',
  'É': 'E',
  'Ê': 'E',
  'Ề': 'E',
  'Ế': 'E',
  'Ễ': 'E',
  'Ể': 'E',
  'Ẽ': 'E',
  'Ē': 'E',
  'Ḕ': 'E',
  'Ḗ': 'E',
  'Ĕ': 'E',
  'Ė': 'E',
  'Ë': 'E',
  'Ẻ': 'E',
  'Ě': 'E',
  'Ȅ': 'E',
  'Ȇ': 'E',
  'Ẹ': 'E',
  'Ệ': 'E',
  'Ȩ': 'E',
  'Ḝ': 'E',
  'Ę': 'E',
  'Ḙ': 'E',
  'Ḛ': 'E',
  'Ɛ': 'E',
  'Ǝ': 'E',
  'Ⓕ': 'F',
  'Ｆ': 'F',
  'Ḟ': 'F',
  'Ƒ': 'F',
  'Ꝼ': 'F',
  'Ⓖ': 'G',
  'Ｇ': 'G',
  'Ǵ': 'G',
  'Ĝ': 'G',
  'Ḡ': 'G',
  'Ğ': 'G',
  'Ġ': 'G',
  'Ǧ': 'G',
  'Ģ': 'G',
  'Ǥ': 'G',
  'Ɠ': 'G',
  'Ꞡ': 'G',
  'Ᵹ': 'G',
  'Ꝿ': 'G',
  'Ⓗ': 'H',
  'Ｈ': 'H',
  'Ĥ': 'H',
  'Ḣ': 'H',
  'Ḧ': 'H',
  'Ȟ': 'H',
  'Ḥ': 'H',
  'Ḩ': 'H',
  'Ḫ': 'H',
  'Ħ': 'H',
  'Ⱨ': 'H',
  'Ⱶ': 'H',
  'Ɥ': 'H',
  'Ⓘ': 'I',
  'Ｉ': 'I',
  'Ì': 'I',
  'Í': 'I',
  'Î': 'I',
  'Ĩ': 'I',
  'Ī': 'I',
  'Ĭ': 'I',
  'İ': 'I',
  'Ï': 'I',
  'Ḯ': 'I',
  'Ỉ': 'I',
  'Ǐ': 'I',
  'Ȉ': 'I',
  'Ȋ': 'I',
  'Ị': 'I',
  'Į': 'I',
  'Ḭ': 'I',
  'Ɨ': 'I',
  'Ⓙ': 'J',
  'Ｊ': 'J',
  'Ĵ': 'J',
  'Ɉ': 'J',
  'Ⓚ': 'K',
  'Ｋ': 'K',
  'Ḱ': 'K',
  'Ǩ': 'K',
  'Ḳ': 'K',
  'Ķ': 'K',
  'Ḵ': 'K',
  'Ƙ': 'K',
  'Ⱪ': 'K',
  'Ꝁ': 'K',
  'Ꝃ': 'K',
  'Ꝅ': 'K',
  'Ꞣ': 'K',
  'Ⓛ': 'L',
  'Ｌ': 'L',
  'Ŀ': 'L',
  'Ĺ': 'L',
  'Ľ': 'L',
  'Ḷ': 'L',
  'Ḹ': 'L',
  'Ļ': 'L',
  'Ḽ': 'L',
  'Ḻ': 'L',
  'Ł': 'L',
  'Ƚ': 'L',
  'Ɫ': 'L',
  'Ⱡ': 'L',
  'Ꝉ': 'L',
  'Ꝇ': 'L',
  'Ꞁ': 'L',
  'Ǉ': 'LJ',
  'ǈ': 'Lj',
  'Ⓜ': 'M',
  'Ｍ': 'M',
  'Ḿ': 'M',
  'Ṁ': 'M',
  'Ṃ': 'M',
  'Ɱ': 'M',
  'Ɯ': 'M',
  'Ⓝ': 'N',
  'Ｎ': 'N',
  'Ǹ': 'N',
  'Ń': 'N',
  'Ñ': 'N',
  'Ṅ': 'N',
  'Ň': 'N',
  'Ṇ': 'N',
  'Ņ': 'N',
  'Ṋ': 'N',
  'Ṉ': 'N',
  'Ƞ': 'N',
  'Ɲ': 'N',
  'Ꞑ': 'N',
  'Ꞥ': 'N',
  'Ǌ': 'NJ',
  'ǋ': 'Nj',
  'Ⓞ': 'O',
  'Ｏ': 'O',
  'Ò': 'O',
  'Ó': 'O',
  'Ô': 'O',
  'Ồ': 'O',
  'Ố': 'O',
  'Ỗ': 'O',
  'Ổ': 'O',
  'Õ': 'O',
  'Ṍ': 'O',
  'Ȭ': 'O',
  'Ṏ': 'O',
  'Ō': 'O',
  'Ṑ': 'O',
  'Ṓ': 'O',
  'Ŏ': 'O',
  'Ȯ': 'O',
  'Ȱ': 'O',
  'Ö': 'O',
  'Ȫ': 'O',
  'Ỏ': 'O',
  'Ő': 'O',
  'Ǒ': 'O',
  'Ȍ': 'O',
  'Ȏ': 'O',
  'Ơ': 'O',
  'Ờ': 'O',
  'Ớ': 'O',
  'Ỡ': 'O',
  'Ở': 'O',
  'Ợ': 'O',
  'Ọ': 'O',
  'Ộ': 'O',
  'Ǫ': 'O',
  'Ǭ': 'O',
  'Ø': 'O',
  'Ǿ': 'O',
  'Ɔ': 'O',
  'Ɵ': 'O',
  'Ꝋ': 'O',
  'Ꝍ': 'O',
  'Ƣ': 'OI',
  'Ꝏ': 'OO',
  'Ȣ': 'OU',
  'Ⓟ': 'P',
  'Ｐ': 'P',
  'Ṕ': 'P',
  'Ṗ': 'P',
  'Ƥ': 'P',
  'Ᵽ': 'P',
  'Ꝑ': 'P',
  'Ꝓ': 'P',
  'Ꝕ': 'P',
  'Ⓠ': 'Q',
  'Ｑ': 'Q',
  'Ꝗ': 'Q',
  'Ꝙ': 'Q',
  'Ɋ': 'Q',
  'Ⓡ': 'R',
  'Ｒ': 'R',
  'Ŕ': 'R',
  'Ṙ': 'R',
  'Ř': 'R',
  'Ȑ': 'R',
  'Ȓ': 'R',
  'Ṛ': 'R',
  'Ṝ': 'R',
  'Ŗ': 'R',
  'Ṟ': 'R',
  'Ɍ': 'R',
  'Ɽ': 'R',
  'Ꝛ': 'R',
  'Ꞧ': 'R',
  'Ꞃ': 'R',
  'Ⓢ': 'S',
  'Ｓ': 'S',
  'ẞ': 'S',
  'Ś': 'S',
  'Ṥ': 'S',
  'Ŝ': 'S',
  'Ṡ': 'S',
  'Š': 'S',
  'Ṧ': 'S',
  'Ṣ': 'S',
  'Ṩ': 'S',
  'Ș': 'S',
  'Ş': 'S',
  'Ȿ': 'S',
  'Ꞩ': 'S',
  'Ꞅ': 'S',
  'Ⓣ': 'T',
  'Ｔ': 'T',
  'Ṫ': 'T',
  'Ť': 'T',
  'Ṭ': 'T',
  'Ț': 'T',
  'Ţ': 'T',
  'Ṱ': 'T',
  'Ṯ': 'T',
  'Ŧ': 'T',
  'Ƭ': 'T',
  'Ʈ': 'T',
  'Ⱦ': 'T',
  'Ꞇ': 'T',
  'Ꜩ': 'TZ',
  'Ⓤ': 'U',
  'Ｕ': 'U',
  'Ù': 'U',
  'Ú': 'U',
  'Û': 'U',
  'Ũ': 'U',
  'Ṹ': 'U',
  'Ū': 'U',
  'Ṻ': 'U',
  'Ŭ': 'U',
  'Ü': 'U',
  'Ǜ': 'U',
  'Ǘ': 'U',
  'Ǖ': 'U',
  'Ǚ': 'U',
  'Ủ': 'U',
  'Ů': 'U',
  'Ű': 'U',
  'Ǔ': 'U',
  'Ȕ': 'U',
  'Ȗ': 'U',
  'Ư': 'U',
  'Ừ': 'U',
  'Ứ': 'U',
  'Ữ': 'U',
  'Ử': 'U',
  'Ự': 'U',
  'Ụ': 'U',
  'Ṳ': 'U',
  'Ų': 'U',
  'Ṷ': 'U',
  'Ṵ': 'U',
  'Ʉ': 'U',
  'Ⓥ': 'V',
  'Ｖ': 'V',
  'Ṽ': 'V',
  'Ṿ': 'V',
  'Ʋ': 'V',
  'Ꝟ': 'V',
  'Ʌ': 'V',
  'Ꝡ': 'VY',
  'Ⓦ': 'W',
  'Ｗ': 'W',
  'Ẁ': 'W',
  'Ẃ': 'W',
  'Ŵ': 'W',
  'Ẇ': 'W',
  'Ẅ': 'W',
  'Ẉ': 'W',
  'Ⱳ': 'W',
  'Ⓧ': 'X',
  'Ｘ': 'X',
  'Ẋ': 'X',
  'Ẍ': 'X',
  'Ⓨ': 'Y',
  'Ｙ': 'Y',
  'Ỳ': 'Y',
  'Ý': 'Y',
  'Ŷ': 'Y',
  'Ỹ': 'Y',
  'Ȳ': 'Y',
  'Ẏ': 'Y',
  'Ÿ': 'Y',
  'Ỷ': 'Y',
  'Ỵ': 'Y',
  'Ƴ': 'Y',
  'Ɏ': 'Y',
  'Ỿ': 'Y',
  'Ⓩ': 'Z',
  'Ｚ': 'Z',
  'Ź': 'Z',
  'Ẑ': 'Z',
  'Ż': 'Z',
  'Ž': 'Z',
  'Ẓ': 'Z',
  'Ẕ': 'Z',
  'Ƶ': 'Z',
  'Ȥ': 'Z',
  'Ɀ': 'Z',
  'Ⱬ': 'Z',
  'Ꝣ': 'Z',
  'ⓐ': 'a',
  'ａ': 'a',
  'ẚ': 'a',
  'à': 'a',
  'á': 'a',
  'â': 'a',
  'ầ': 'a',
  'ấ': 'a',
  'ẫ': 'a',
  'ẩ': 'a',
  'ã': 'a',
  'ā': 'a',
  'ă': 'a',
  'ằ': 'a',
  'ắ': 'a',
  'ẵ': 'a',
  'ẳ': 'a',
  'ȧ': 'a',
  'ǡ': 'a',
  'ä': 'a',
  'ǟ': 'a',
  'ả': 'a',
  'å': 'a',
  'ǻ': 'a',
  'ǎ': 'a',
  'ȁ': 'a',
  'ȃ': 'a',
  'ạ': 'a',
  'ậ': 'a',
  'ặ': 'a',
  'ḁ': 'a',
  'ą': 'a',
  'ⱥ': 'a',
  'ɐ': 'a',
  'ꜳ': 'aa',
  'æ': 'ae',
  'ǽ': 'ae',
  'ǣ': 'ae',
  'ꜵ': 'ao',
  'ꜷ': 'au',
  'ꜹ': 'av',
  'ꜻ': 'av',
  'ꜽ': 'ay',
  'ⓑ': 'b',
  'ｂ': 'b',
  'ḃ': 'b',
  'ḅ': 'b',
  'ḇ': 'b',
  'ƀ': 'b',
  'ƃ': 'b',
  'ɓ': 'b',
  'ⓒ': 'c',
  'ｃ': 'c',
  'ć': 'c',
  'ĉ': 'c',
  'ċ': 'c',
  'č': 'c',
  'ç': 'c',
  'ḉ': 'c',
  'ƈ': 'c',
  'ȼ': 'c',
  'ꜿ': 'c',
  'ↄ': 'c',
  'ⓓ': 'd',
  'ｄ': 'd',
  'ḋ': 'd',
  'ď': 'd',
  'ḍ': 'd',
  'ḑ': 'd',
  'ḓ': 'd',
  'ḏ': 'd',
  'đ': 'd',
  'ƌ': 'd',
  'ɖ': 'd',
  'ɗ': 'd',
  'ꝺ': 'd',
  'ǳ': 'dz',
  'ǆ': 'dz',
  'ⓔ': 'e',
  'ｅ': 'e',
  'è': 'e',
  'é': 'e',
  'ê': 'e',
  'ề': 'e',
  'ế': 'e',
  'ễ': 'e',
  'ể': 'e',
  'ẽ': 'e',
  'ē': 'e',
  'ḕ': 'e',
  'ḗ': 'e',
  'ĕ': 'e',
  'ė': 'e',
  'ë': 'e',
  'ẻ': 'e',
  'ě': 'e',
  'ȅ': 'e',
  'ȇ': 'e',
  'ẹ': 'e',
  'ệ': 'e',
  'ȩ': 'e',
  'ḝ': 'e',
  'ę': 'e',
  'ḙ': 'e',
  'ḛ': 'e',
  'ɇ': 'e',
  'ɛ': 'e',
  'ǝ': 'e',
  'ⓕ': 'f',
  'ｆ': 'f',
  'ḟ': 'f',
  'ƒ': 'f',
  'ꝼ': 'f',
  'ⓖ': 'g',
  'ｇ': 'g',
  'ǵ': 'g',
  'ĝ': 'g',
  'ḡ': 'g',
  'ğ': 'g',
  'ġ': 'g',
  'ǧ': 'g',
  'ģ': 'g',
  'ǥ': 'g',
  'ɠ': 'g',
  'ꞡ': 'g',
  'ᵹ': 'g',
  'ꝿ': 'g',
  'ⓗ': 'h',
  'ｈ': 'h',
  'ĥ': 'h',
  'ḣ': 'h',
  'ḧ': 'h',
  'ȟ': 'h',
  'ḥ': 'h',
  'ḩ': 'h',
  'ḫ': 'h',
  'ẖ': 'h',
  'ħ': 'h',
  'ⱨ': 'h',
  'ⱶ': 'h',
  'ɥ': 'h',
  'ƕ': 'hv',
  'ⓘ': 'i',
  'ｉ': 'i',
  'ì': 'i',
  'í': 'i',
  'î': 'i',
  'ĩ': 'i',
  'ī': 'i',
  'ĭ': 'i',
  'ï': 'i',
  'ḯ': 'i',
  'ỉ': 'i',
  'ǐ': 'i',
  'ȉ': 'i',
  'ȋ': 'i',
  'ị': 'i',
  'į': 'i',
  'ḭ': 'i',
  'ɨ': 'i',
  'ı': 'i',
  'ⓙ': 'j',
  'ｊ': 'j',
  'ĵ': 'j',
  'ǰ': 'j',
  'ɉ': 'j',
  'ⓚ': 'k',
  'ｋ': 'k',
  'ḱ': 'k',
  'ǩ': 'k',
  'ḳ': 'k',
  'ķ': 'k',
  'ḵ': 'k',
  'ƙ': 'k',
  'ⱪ': 'k',
  'ꝁ': 'k',
  'ꝃ': 'k',
  'ꝅ': 'k',
  'ꞣ': 'k',
  'ⓛ': 'l',
  'ｌ': 'l',
  'ŀ': 'l',
  'ĺ': 'l',
  'ľ': 'l',
  'ḷ': 'l',
  'ḹ': 'l',
  'ļ': 'l',
  'ḽ': 'l',
  'ḻ': 'l',
  'ſ': 'l',
  'ł': 'l',
  'ƚ': 'l',
  'ɫ': 'l',
  'ⱡ': 'l',
  'ꝉ': 'l',
  'ꞁ': 'l',
  'ꝇ': 'l',
  'ǉ': 'lj',
  'ⓜ': 'm',
  'ｍ': 'm',
  'ḿ': 'm',
  'ṁ': 'm',
  'ṃ': 'm',
  'ɱ': 'm',
  'ɯ': 'm',
  'ⓝ': 'n',
  'ｎ': 'n',
  'ǹ': 'n',
  'ń': 'n',
  'ñ': 'n',
  'ṅ': 'n',
  'ň': 'n',
  'ṇ': 'n',
  'ņ': 'n',
  'ṋ': 'n',
  'ṉ': 'n',
  'ƞ': 'n',
  'ɲ': 'n',
  'ŉ': 'n',
  'ꞑ': 'n',
  'ꞥ': 'n',
  'ǌ': 'nj',
  'ⓞ': 'o',
  'ｏ': 'o',
  'ò': 'o',
  'ó': 'o',
  'ô': 'o',
  'ồ': 'o',
  'ố': 'o',
  'ỗ': 'o',
  'ổ': 'o',
  'õ': 'o',
  'ṍ': 'o',
  'ȭ': 'o',
  'ṏ': 'o',
  'ō': 'o',
  'ṑ': 'o',
  'ṓ': 'o',
  'ŏ': 'o',
  'ȯ': 'o',
  'ȱ': 'o',
  'ö': 'o',
  'ȫ': 'o',
  'ỏ': 'o',
  'ő': 'o',
  'ǒ': 'o',
  'ȍ': 'o',
  'ȏ': 'o',
  'ơ': 'o',
  'ờ': 'o',
  'ớ': 'o',
  'ỡ': 'o',
  'ở': 'o',
  'ợ': 'o',
  'ọ': 'o',
  'ộ': 'o',
  'ǫ': 'o',
  'ǭ': 'o',
  'ø': 'o',
  'ǿ': 'o',
  'ɔ': 'o',
  'ꝋ': 'o',
  'ꝍ': 'o',
  'ɵ': 'o',
  'ƣ': 'oi',
  'ȣ': 'ou',
  'ꝏ': 'oo',
  'ⓟ': 'p',
  'ｐ': 'p',
  'ṕ': 'p',
  'ṗ': 'p',
  'ƥ': 'p',
  'ᵽ': 'p',
  'ꝑ': 'p',
  'ꝓ': 'p',
  'ꝕ': 'p',
  'ⓠ': 'q',
  'ｑ': 'q',
  'ɋ': 'q',
  'ꝗ': 'q',
  'ꝙ': 'q',
  'ⓡ': 'r',
  'ｒ': 'r',
  'ŕ': 'r',
  'ṙ': 'r',
  'ř': 'r',
  'ȑ': 'r',
  'ȓ': 'r',
  'ṛ': 'r',
  'ṝ': 'r',
  'ŗ': 'r',
  'ṟ': 'r',
  'ɍ': 'r',
  'ɽ': 'r',
  'ꝛ': 'r',
  'ꞧ': 'r',
  'ꞃ': 'r',
  'ⓢ': 's',
  'ｓ': 's',
  'ß': 's',
  'ś': 's',
  'ṥ': 's',
  'ŝ': 's',
  'ṡ': 's',
  'š': 's',
  'ṧ': 's',
  'ṣ': 's',
  'ṩ': 's',
  'ș': 's',
  'ş': 's',
  'ȿ': 's',
  'ꞩ': 's',
  'ꞅ': 's',
  'ẛ': 's',
  'ⓣ': 't',
  'ｔ': 't',
  'ṫ': 't',
  'ẗ': 't',
  'ť': 't',
  'ṭ': 't',
  'ț': 't',
  'ţ': 't',
  'ṱ': 't',
  'ṯ': 't',
  'ŧ': 't',
  'ƭ': 't',
  'ʈ': 't',
  'ⱦ': 't',
  'ꞇ': 't',
  'ꜩ': 'tz',
  'ⓤ': 'u',
  'ｕ': 'u',
  'ù': 'u',
  'ú': 'u',
  'û': 'u',
  'ũ': 'u',
  'ṹ': 'u',
  'ū': 'u',
  'ṻ': 'u',
  'ŭ': 'u',
  'ü': 'u',
  'ǜ': 'u',
  'ǘ': 'u',
  'ǖ': 'u',
  'ǚ': 'u',
  'ủ': 'u',
  'ů': 'u',
  'ű': 'u',
  'ǔ': 'u',
  'ȕ': 'u',
  'ȗ': 'u',
  'ư': 'u',
  'ừ': 'u',
  'ứ': 'u',
  'ữ': 'u',
  'ử': 'u',
  'ự': 'u',
  'ụ': 'u',
  'ṳ': 'u',
  'ų': 'u',
  'ṷ': 'u',
  'ṵ': 'u',
  'ʉ': 'u',
  'ⓥ': 'v',
  'ｖ': 'v',
  'ṽ': 'v',
  'ṿ': 'v',
  'ʋ': 'v',
  'ꝟ': 'v',
  'ʌ': 'v',
  'ꝡ': 'vy',
  'ⓦ': 'w',
  'ｗ': 'w',
  'ẁ': 'w',
  'ẃ': 'w',
  'ŵ': 'w',
  'ẇ': 'w',
  'ẅ': 'w',
  'ẘ': 'w',
  'ẉ': 'w',
  'ⱳ': 'w',
  'ⓧ': 'x',
  'ｘ': 'x',
  'ẋ': 'x',
  'ẍ': 'x',
  'ⓨ': 'y',
  'ｙ': 'y',
  'ỳ': 'y',
  'ý': 'y',
  'ŷ': 'y',
  'ỹ': 'y',
  'ȳ': 'y',
  'ẏ': 'y',
  'ÿ': 'y',
  'ỷ': 'y',
  'ẙ': 'y',
  'ỵ': 'y',
  'ƴ': 'y',
  'ɏ': 'y',
  'ỿ': 'y',
  'ⓩ': 'z',
  'ｚ': 'z',
  'ź': 'z',
  'ẑ': 'z',
  'ż': 'z',
  'ž': 'z',
  'ẓ': 'z',
  'ẕ': 'z',
  'ƶ': 'z',
  'ȥ': 'z',
  'ɀ': 'z',
  'ⱬ': 'z',
  'ꝣ': 'z',
  'Ά': 'Α',
  'Έ': 'Ε',
  'Ή': 'Η',
  'Ί': 'Ι',
  'Ϊ': 'Ι',
  'Ό': 'Ο',
  'Ύ': 'Υ',
  'Ϋ': 'Υ',
  'Ώ': 'Ω',
  'ά': 'α',
  'έ': 'ε',
  'ή': 'η',
  'ί': 'ι',
  'ϊ': 'ι',
  'ΐ': 'ι',
  'ό': 'ο',
  'ύ': 'υ',
  'ϋ': 'υ',
  'ΰ': 'υ',
  'ω': 'ω',
  'ς': 'σ'
};

// Copied from Select2
export function stripDiacritics(text) {
  // Used 'uni range + named function' from http://jsperf.com/diacritics/18
  function match(a) {
    return DIACRITICS[a] || a;
  }

  return `${text}`.replace(/[^\u0000-\u007E]/g, match);
}

export function defaultMatcher(value, text) {
  return stripDiacritics(value).toUpperCase().indexOf(stripDiacritics(text).toUpperCase());
}
