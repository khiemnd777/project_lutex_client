export type MacroRegisteredType<TResult = any> = {
  name: string;
  macroFn: (parameters: Record<string, any>) => TResult;
};
