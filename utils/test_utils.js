import { performance } from 'perf_hooks';

/**
 * @param {function} fn
 * @param {boolean} [isReturnValue=false]
 * @return {Promise< number | [number, any] >} ms execution |  [ms execution, returnValue]
 */
export const getTimeExecutionAsync = async (fn, isReturnValue = false) => {
  const startTime = performance.now();

  if (!isReturnValue) {
    await fn();
    return performance.now() - startTime;
  }

  const returnValue = await fn();
  return [performance.now() - startTime, returnValue];
};
/**
 * @param {function} fn
 * @param {boolean} [isReturnValue=false]
 * @return { number | [number, any] } ms execution |  [ms execution, returnValue]
 */
export const getTimeExecution = (fn, isReturnValue = false) => {
  const startTime = performance.now();

  // eslint-disable-next-line no-magic-numbers
  const getDuration = () => Math.round((performance.now() - startTime) * 1e3) / 1e3;

  if (!isReturnValue) {
    fn();
    return getDuration();
  }

  const returnValue = fn();
  return [getDuration(), returnValue];
};
