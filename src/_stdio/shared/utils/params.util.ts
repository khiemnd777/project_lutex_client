import find from 'lodash-es/find';
import { ParameterConsumedType } from '../types/parameter-types';

export const GetParameterValue = (name: string, params?: ParameterConsumedType[]) => {
  const matched = find(params, (p) => p.name === name);
  return matched?.value as string;
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
