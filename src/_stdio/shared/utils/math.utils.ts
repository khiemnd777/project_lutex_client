export const MathMax = Math.max;
export const MathMin = Math.min;
export const MathCeil = Math.ceil;
export const MathFloor = Math.floor;
export const MathRound = Math.round;
export const MathAbs = Math.abs;

/**
 * Get sign of a number
 * @param num input number
 */
export function Sign(num: number) {
  // If x is NaN, the result is NaN.
  // If x is -0, the result is -0.
  // If x is +0, the result is +0.
  // If x is negative and not -0, the result is -1.
  // If x is positive and not +0, the result is +1.
  return typeof num === 'number' ? (num ? (num < 0 ? -1 : 1) : num === num ? 0 : NaN) : NaN;
  // A more aesthetical persuado-representation is shown below
  //
  // ( (x > 0) ? 0 : 1 )  // if x is negative then negative one
  //          +           // else (because you cant be both - and +)
  // ( (x < 0) ? 0 : -1 ) // if x is positive then positive one
  //         ||           // if x is 0, -0, or NaN, or not a number,
  //         +x           // Then the result will be x, (or) if x is
  //                      // not a number, then x converts to number
}

export function Round(num: number, precision?: number) {
  /// <summary>
  /// Round number value, this method get 4 number after floating point.
  /// This method is useful to reduce length of number and speed up SVG path drawing.
  /// TODO: Currently we get 4 number after floating point - this quite exact on render path, if something incorrect we can increase more number.
  /// </summary>
  /// <param name="number">[number] number to round</param>
  /// <returns type="number">[number] new rounded number</returns>
  /// <param name="precision">[number] Precision number eg: 1e4</param>
  precision = precision || 1e4;
  return ~~(num * precision + Sign(num) * 0.5) / precision;
}
