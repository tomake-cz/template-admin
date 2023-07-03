const DICT = {
  á: 'a',
  é: 'e',
  ě: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  ř: 'r',
  š: 's',
  č: 'c',
  ž: 'z',
  ť: 't',
  ď: 'd',
  ň: 'n',
  ˇ: '',
  '´': '',
};

export const slugify = (str: string | undefined) => {
  if (!str) return;
  str = str.trim();
  str = str.toLowerCase();
  str = str.replace(/\s+/g, '-').replace(/-+/g, '-');
  Object.entries(DICT).forEach(([key, value]) => {
    str = str?.replace(new RegExp(key, 'g'), value);
  });
  return str;
};
