/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/19
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/**
 * Biquad filter
 *
 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
 *  Copyright 2010 Ricard Marxer. All rights reserved.
 *
 * Implementation based on:
 * @see http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt
 */
export class Biquad {
  constructor(type, sampleRate) {
    // L
    const x1l = 0;
    const x2l = 0;
    const y1l = 0;
    const y2l = 0;

    // R
    const x1r = 0;
    const x2r = 0;
    const y1r = 0;
    const y2r = 0;

    const b0 = 1;
    const a0 = 1;

    const b1 = 0;
    const a1 = 0;

    const b2 = 0;
    const a2 = 0;

    // 1
    const b0a0 = b0 / a0;
    // 0
    const b1a0 = b1 / a0;
    // 0
    const b2a0 = b2 / a0;
    // 0
    const a1a0 = a1 / a0;
    // 0
    const a2a0 = a2 / a0;

    // "wherever it's happenin', man."  Center Frequency or
    // Corner Frequency, or shelf midpoint frequency, depending
    // on which filter type.  The "significant frequency".
    const f0 = 3000;

    // used only for peaking and shelving filters
    const dBgain = 12;

    // the EE kind of definition, except for peakingEQ in which A*Q is
    // the classic EE Q.  That adjustment in definition was made so that
    // a boost of N dB followed by a cut of N dB for identical Q and
    // f0/Fs results in a precisely flat unity gain filter or "wire".
    const q = 1;

    // the bandwidth in octaves (between -3 dB frequencies for BPF
    // and notch or between midpoint (dBgain/2) gain frequencies for
    // peaking EQ
    const bw = -3;

    // a "shelf slope" parameter (for shelving EQ only).  When S = 1,
    // the shelf slope is as steep as it can be and remain monotonically
    // increasing or decreasing gain with frequency.  The shelf slope, in
    // dB/octave, remains proportional to S for all other values for a
    // fixed f0/Fs and dBgain.
    const s = 1;
    // make property
    Object.assign(this, {
      parameterType: Biquad.Q,
      type,
      sampleRate,
      // l
      x1l,
      x2l,2,
      y1l,
      y2l,
      // r
      x1r,
      x2r,
      y1r,
      y2r,
      // ab
      b0,
      a0,
      b1,
      a1,
      b2,
      a2,
      // NN / a0
      b0a0,
      b1a0,
      b2a0,
      a1a0,
      a2a0,
      // const
      f0,
      dBgain,
      q,
      bw,
      s,
    })
  }
  // ----------------------------------------
  // CONST
  // ----------------------------------------
  // Biquad filter types
  /**
   * H(s) = 1 / (s^2 + s/Q + 1)
   * @const LPF
   * @returns {number} type 0 を返します
   * @default 0
   */
  static get LPF() {
    return 0;
  }
  /**
   * H(s) = s^2 / (s^2 + s/Q + 1)
   * @const HPF
   * @returns {number} type 1 を返します
   * @default 1
   */
  static get HPF() {
    return 1;
  }
  /**
   * H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
   * @const BPF_CONSTANT_SKIRT
   * @returns {number} type 2 を返します
   * @default 2
   */
  static get BPF_CONSTANT_SKIRT() {
    return 2;
  }
  /**
   * H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
   * @const BPF_CONSTANT_PEAK
   * @returns {number} type 2 を返します
   * @default 2
   */
  static get BPF_CONSTANT_PEAK() {
    return 2;
  }
  /**
   * H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
   * @const NOTCH
   * @returns {number} type 4 を返します
   * @default 4
   */
  static get NOTCH() {
    return 4;
  }
  /**
   * H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
   * @const APF
   * @returns {number} type 5 を返します
   * @default 5
   */
  static get APF() {
    return 5;
  }
  /**
   * H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
   * @const PEAKING_EQ
   * @returns {number} type 6 を返します
   * @default 6
   */
  static get PEAKING_EQ() {
    return 6;
  }
  /**
   * H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
   * @const PEAKING_EQ
   * @returns {number} type 7 を返します
   * @default 7
   */
  static get LOW_SHELF() {
    return 7;
  }
  /**
   * H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)
   * @const HIGH_SHELF
   * @returns {number} type 8 を返します
   * @default 8
   */
  static get HIGH_SHELF() {
    return 8;
  }

  // Biquad filter parameter types
  /**
   * Biquad filter parameter types Q
   * @const Q
   * @returns {number} type 1 を返します
   * @default 1
   */
  static get Q() {
    return 1;
  }
  /**
   * Biquad filter parameter types BW
   *
   * SHARED with BACKWARDS LOOP MODE
   * @const Q
   * @returns {number} type 2 を返します
   * @default 2
   */
  static get BW() {
    return 2;
  }
  /**
   * Biquad filter parameter types S
   * @const S
   * @returns {number} type 3 を返します
   * @default 3
   */
  static get S() {
    return 3;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  recalculateCoefficients() {

  }
}
