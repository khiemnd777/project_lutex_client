import { find, isEmpty } from 'lodash-es';
import { ParameterConsumedType } from '../types/parameter-types';

export const GetParameterValue = (
  name: string,
  params?: ParameterConsumedType[],
  defaultParams?: Record<string, string>
) => {
  const matched = find(params, (p) => String(p.name).trim() === name);
  if (!isEmpty(matched) && matched?.value) {
    return matched?.value as string;
  }
  return defaultParams?.[name] ? String(defaultParams?.[name]) : '';
};

export const GetParameterOrDataValue = <T = any>(
  paramName: string,
  dataPropName: string,
  params?: ParameterConsumedType[],
  data?: T
) => {
  const paramValue = GetParameterValue(paramName, params);
  const dataValue = data?.[dataPropName];
  return paramValue || dataValue;
};

export const GetParameterValueWithGeneric = <T = any>(name: string, params?: Record<string, any>) => {
  return params ? (params?.[name] as T) : undefined;
};
