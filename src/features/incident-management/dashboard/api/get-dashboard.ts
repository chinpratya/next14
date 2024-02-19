export const getDashboard = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return { data: [] };
};
