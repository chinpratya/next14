export const conditionOptions = [
  {
    label: 'is',
    value: 'is',
  },
  {
    label: 'not',
    value: 'not',
  },
  {
    label: 'is one of',
    value: 'is_one_of',
  },
  {
    label: 'is not one of',
    value: 'is_not_one_of',
  },
  {
    label: 'exists',
    value: 'exists',
  },
  {
    label: 'does not exist',
    value: 'does_not_exist',
  },
];

export const unitOptions = [
  {
    label: 'Minute',
    value: 'minute',
    key: 'logManagement.minute',
  },
  {
    label: 'Hour',
    value: 'hour',
    key: 'logManagement.hour',
  },
  {
    label: 'Day',
    value: 'day',
    key: 'logManagement.day',
  },
];

export const operatorOptions = [
  {
    label: 'Greater than',
    value: '>',
  },
  {
    label: 'Greater than or equal to',
    value: '>=',
  },
  {
    label: 'Less than',
    value: '<',
  },
  {
    label: 'Less than or equal to',
    value: '<=',
  },
  {
    label: 'Equal to',
    value: '=',
  },
  {
    label: 'Not equal to',
    value: '!=',
  },
];

export const whenOptions = [
  {
    label: 'Count',
    value: 'count',
  },
  { label: 'Maximum', value: 'max' },
  {
    label: 'Minimum',
    value: 'min',
  },
  {
    label: 'Sum',
    value: 'sum',
  },
  { label: 'Average', value: 'avg' },
];

export const severityOptions = [
  {
    label: 'Low',
    value: 'LOW',
    key: 'logManagement.low',
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
    key: 'logManagement.medium',
  },
  {
    label: 'High',
    value: 'HIGH',
    key: 'logManagement.high',
  },
  {
    label: 'Critical',
    value: 'CRITICAL',
    key: 'logManagement.critical',
  },
];
