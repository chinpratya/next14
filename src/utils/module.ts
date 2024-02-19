import {
  CYBERFENCE_CONFIG,
  DATAFENCE_CONFIG,
  CENTRAL_MANAGEMENT_CONFIG,
  PHYSICAL_MANAGEMENT_CONFIG,
} from '@/config/modules';

export const getModules = (
  appId?: string,
  search?: string
) => {
  const allModules = [
    ...DATAFENCE_CONFIG,
    ...CYBERFENCE_CONFIG,
    ...CENTRAL_MANAGEMENT_CONFIG,
    ...PHYSICAL_MANAGEMENT_CONFIG,
  ];

  const currentModules = allModules.filter(
    (item) => item.appId === appId
  );

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    return currentModules.filter(
      (item) =>
        searchRegex.test(item.title) ||
        searchRegex.test(item.description)
    );
  }

  return currentModules;
};
