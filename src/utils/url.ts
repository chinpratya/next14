export const removeQuery = (url: string) => {
  return url.replace(/\?.*$/, '');
};

export const getQuery = (url: string) => {
  const query = url.match(/\?.*$/);
  if (!query) return {};
  const queryStr = query[0].replace(/^\?/, '');
  const queryArr = queryStr.split('&');
  return queryArr.reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
