import _ from 'lodash';

import { FilterDetail } from '../types';

type FormatFilterForm = {
  conditionType: 'must' | 'must_not';
  data: Record<string, unknown>[];
};

export type FormatFilterPayload = {
  filters: {
    field: string;
    condition: string;
    value: string | string[];
  }[];
};

const formatFilterForm = ({
  data,
  conditionType,
}: FormatFilterForm) => {
  return data.map((item) => {
    if (item.match_phrase) {
      const [key] = Object.keys(item.match_phrase);
      return {
        field: key,
        condition:
          conditionType === 'must' ? 'is' : 'not',
        value: _.get(item, [
          'match_phrase',
          key,
          'query',
        ]) as string | string[],
      };
    } else if (item.exists) {
      return {
        field: _.get(item, ['exists', 'field']) as string,
        condition:
          conditionType === 'must'
            ? 'exists'
            : 'does_not_exist',
        value: '',
      };
    } else if (item.bool) {
      let field = '';
      const values: string[] = [];

      _.get(item, ['bool', 'should']).forEach(
        (item: {
          match_phrase: Record<string, unknown>;
        }) => {
          const [key] = Object.keys(item.match_phrase);
          field = key;
          values.push(
            _.get(item, ['match_phrase', key]) as string
          );
        }
      );

      return {
        field,
        condition:
          conditionType === 'must'
            ? 'is_one_of'
            : 'is_not_one_of',
        value: values,
      };
    } else return [];
  });
};

const formatFilterPayload = ({
  filters,
}: FormatFilterPayload) => {
  const must: Record<string, unknown>[] = [];
  const mustNot: Record<string, unknown>[] = [];

  filters.forEach(({ condition, field, value }) => {
    //for is, not
    if (condition === 'is' || condition === 'not') {
      const payload = {
        match_phrase: {
          [field]: { query: value as string },
        },
      };

      if (condition === 'is') must.push(payload);
      else mustNot.push(payload);
    }
    //for exists, does_not_exist
    else if (
      condition === 'exists' ||
      condition === 'does_not_exist'
    ) {
      const payload = { exists: { field } };

      if (condition === 'exists') must.push(payload);
      else mustNot.push(payload);
    }
    //for is_one_of, does_not_exist
    else if (
      condition === 'is_one_of' ||
      condition === 'is_not_one_of'
    ) {
      const values = value as string[];
      const should = values.map((data) => {
        return { match_phrase: { [field]: data } };
      });

      const payload = {
        bool: { minimum_should_match: 1, should },
      };

      if (condition === 'is_one_of') must.push(payload);
      else mustNot.push(payload);
    }
  });

  return {
    must,
    must_not: mustNot,
  };
};

const getFilterForm = (
  filters: Record<string, unknown>
) => {
  const result = [
    ...formatFilterForm({
      data:
        (filters?.must as Record<string, unknown>[]) ??
        [],
      conditionType: 'must',
    }),
    ...formatFilterForm({
      data:
        (filters?.must_not as Record<
          string,
          unknown
        >[]) ?? [],
      conditionType: 'must_not',
    }),
  ] as FilterDetail[];

  return result;
};

export const filter = {
  getFilterForm,
  formatFilterForm,
  formatFilterPayload,
};
