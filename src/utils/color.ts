const generateColor = (count: number) => {
  const color = [];
  for (let i = 0; i < count; i++) {
    color.push(
      '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
    );
  }
  return color;
};

export const color = {
  generateColor,
};
