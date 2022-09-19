export const errorConvert = (str: any) => {
  const convertTypes = String(str);
  const replaceWhitespaces = (s:string) => s.replace('_', ' ').toLowerCase();
  const replaceFirstLetter = (s:string) => s.charAt(0).toUpperCase() + s.slice(1);
  return replaceFirstLetter(replaceWhitespaces(convertTypes));
};
