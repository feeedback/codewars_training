import { performance } from 'perf_hooks';

export const getTimeExecutionAsync = async (fn) => {
  const startTime = performance.now();

  await fn();

  return performance.now() - startTime;
};

export const getTimeExecution = (fn) => {
  const startTime = performance.now();

  fn();

  return performance.now() - startTime;
};
