/**
 * author (at)taikiken / http://inazumatv.com
 * date 2016/07/19
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

export class DSP {
  constructor() {

  }
  // ----------------------------------------
  // CONST (GETTER) @read only
  // ----------------------------------------

  // Channels
  /**
   * Channels - left
   * @const LEFT
   * @returns {number} left channel number (0) を返します
   * @default 0
   */
  static get LEFT() {
    return 0;
  }
  /**
   * Channels - right
   * @const RIGHT
   * @returns {number} right channel number (1) を返します
   * @default 1
   */
  static get RIGHT() {
    return 1;
  }
  /**
   * Channels - mix
   * @const MIX
   * @returns {number} mix channel number (2) を返します
   * @default 2
   */
  static get MIX() {
    return 2;
  }

  // Waveforms
  /**
   * Waveforms - sine 波
   * @const SINE
   * @returns {number} Waveforms sine 波 (1) を返します
   * @default 1
   */
  static get SINE() {
    return 1;
  }
  /**
   * Waveforms - triangle 三角波
   * @const TRIANGLE
   * @returns {number} Waveforms triangle 三角波 (2) を返します
   * @default 2
   */
  static get TRIANGLE() {
    return 2;
  }
  /**
   * Waveforms - saw 鋸波
   * @const SAW
   * @returns {number} Waveforms saw 鋸波 (3) を返します
   * @default 3
   */
  static get SAW() {
    return 3;
  }
  /**
   * Waveforms - square 矩形波
   * @const SQUARE
   * @returns {number} Waveforms square 矩形波 (4) を返します
   * @default 4
   */
  static get SQUARE() {
    return 4;
  }

  // Filters
  /**
   * Filters - low pass filter
   *
   * @see https://ja.wikipedia.org/wiki/ローパスフィルタ
   *
   * @const LOW_PASS
   * @returns {number} Filters low pass filter (0) を返します
   * @default 0
   */
  static get LOW_PASS() {
    return 0;
  }
  /**
   * Filters - high pass filter
   *
   * @see https://ja.wikipedia.org/wiki/ローパスフィルタ
   *
   * @const HIGH_PASS
   * @returns {number} Filters high pass filter (1) を返します
   * @default 0
   */
  static get HIGH_PASS() {
    return 1;
  }
  /**
   * Filters - band pass filter
   *
   * @see https://ja.wikipedia.org/wiki/バンドパスフィルタ
   *
   * @const BAND_PASS
   * @returns {number} Filters band pass filter (2) を返します
   * @default 2
   */
  static get BAND_PASS() {
    return 2;
  }
  /**
   * Filters - notch filter
   *
   * @see https://ja.wikipedia.org/wiki/バンドストップフィルタ
   *
   * <pre>
   * ノッチフィルタ (notch filter) は、阻止帯域が狭い（Q値が高い）バンドストップフィルタである。
   * </pre>
   * @const NOTCH
   * @returns {number} Filters notch filter (3) を返します
   * @default 2
   */
  static get NOTCH() {
    return 3;
  }
}

