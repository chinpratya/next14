type ParamsObject = Record<string, unknown>;

function objectToParams(params: ParamsObject): string {
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);

  const urlParams = paramKeys.reduce(
    (acc: string[], key: string, index: number) => {
      const value = paramValues[index] as
        | string
        | number
        | boolean;

      if (value !== undefined) {
        acc.push(
          `${encodeURIComponent(
            key
          )}=${encodeURIComponent(value)}`
        );
      }

      return acc;
    },
    []
  );

  return urlParams.join('&');
}

function sample(data: ParamsObject) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    if (value) params.append(key, value as string);
  }

  return params;
}

export const queryString = {
  stringify: objectToParams,
  sample,
};

export default queryString;
