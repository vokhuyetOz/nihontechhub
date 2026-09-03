import { Dimensions, PixelRatio } from 'react-native';

const wpx = (px: number) => PixelRatio.roundToNearestPixel(px);

const { width, height } = Dimensions.get('window');
export const Sizes = {
  device_width: width,
  device_height: height,
  /**
   * 48
   */
  padding: {
    /**
     * 2
     */
    tiny: wpx(2), //2
    /**
     * 4
     */
    smaller: wpx(4), //4
    /**
     * 8
     */
    small: wpx(8), //8
    /**
     * 12
     */
    medium: wpx(12), //12
    /**
     * 16
     */
    default: wpx(16), //16
    /**
     * 18
     */
    large: wpx(18),
    /**
     * 20
     */
    larger: wpx(20),
    /**
     * 24
     */
    huge: wpx(24),
  },
  border_radius: 4,
  oval_radius: 32,
  elevation: 2,
  input_height: 48,
  border: 1,

  //font text ,icon
  /**
   * 9
   */
  tiny: wpx(9),
  /**
   * 12
   */
  little: wpx(12),
  /**
   * 14
   */
  smaller: wpx(14),
  /**
   * 16
   */
  small: wpx(16),
  /**
   * 18
   */
  normal: wpx(18),
  /**
   * 20
   */
  large: wpx(20),
  /**
   * 22
   */
  larger: wpx(22),
  /**
   * 24
   */
  heading1: wpx(24),
  /**
   * 28
   */
  heading2: wpx(28),
  wpx,
  mobile: {
    landscape: {
      tabbar: wpx(48),
      masonry_column: 2,
      device_width: width,
      device_height: height,
      padding: {
        /**
         * 2
         */
        tiny: wpx(2), //2
        /**
         * 4
         */
        smaller: wpx(4), //4
        /**
         * 8
         */
        small: wpx(8), //8
        /**
         * 12
         */
        medium: wpx(12), //12
        /**
         * 16
         */
        default: wpx(16), //16
        /**
         * 18
         */
        large: wpx(18),
        /**
         * 20
         */
        larger: wpx(20),
        /**
         * 24
         */
        huge: wpx(24),
      },

      border_radius: 4,
      oval_radius: 32,
      elevation: 2,
      input_height: 48,
      border: 1,

      //font text ,icon
      /**
       * 9
       */
      tiny: wpx(9),
      /**
       * 12
       */
      little: wpx(12),
      /**
       * 14
       */
      smaller: wpx(14),
      /**
       * 16
       */
      small: wpx(16),
      /**
       * 18
       */
      normal: wpx(18),
      /**
       * 20
       */
      large: wpx(20),
      /**
       * 22
       */
      larger: wpx(22),
      /**
       * 24
       */
      heading1: wpx(24),
      /**
       * 28
       */
      heading2: wpx(28),

      avatar: wpx(40),
      letter: wpx(0),
      wpx,
    },
    portrait: {
      tabbar: wpx(48),
      masonry_column: 1,
      device_width: width,
      device_height: height,
      padding: {
        /**
         * 2
         */
        tiny: wpx(2), //2
        /**
         * 4
         */
        smaller: wpx(4), //4
        /**
         * 8
         */
        small: wpx(8), //8
        /**
         * 12
         */
        medium: wpx(12), //12
        /**
         * 16
         */
        default: wpx(16), //16
        /**
         * 18
         */
        large: wpx(18),
        /**
         * 20
         */
        larger: wpx(20),
        /**
         * 24
         */
        huge: wpx(24),
      },

      border_radius: 4,
      oval_radius: 32,
      elevation: 2,
      input_height: 48,
      border: 1,

      //font text ,icon
      /**
       * 9
       */
      tiny: wpx(9),
      /**
       * 12
       */
      little: wpx(12),
      /**
       * 14
       */
      smaller: wpx(14),
      /**
       * 16
       */
      small: wpx(16),
      /**
       * 18
       */
      normal: wpx(18),
      /**
       * 20
       */
      large: wpx(20),
      /**
       * 22
       */
      larger: wpx(22),
      /**
       * 24
       */
      heading1: wpx(24),
      /**
       * 28
       */
      heading2: wpx(28),

      avatar: wpx(40),
      letter: wpx(0),
      wpx,
    },
  },
  tablet: {
    landscape: {
      tabbar: wpx(48),
      masonry_column: 2,
      device_width: width,
      device_height: height,
      padding: {
        /**
         * 2
         */
        tiny: wpx(2), //2
        /**
         * 4
         */
        smaller: wpx(4), //4
        /**
         * 8
         */
        small: wpx(8), //8
        /**
         * 12
         */
        medium: wpx(12), //12
        /**
         * 16
         */
        default: wpx(16), //16
        /**
         * 18
         */
        large: wpx(18),
        /**
         * 20
         */
        larger: wpx(20),
        /**
         * 24
         */
        huge: wpx(24),
      },

      border_radius: 4,
      oval_radius: 32,
      elevation: 2,
      input_height: 48,
      border: 1,

      //font text ,icon
      /**
       * 9
       */
      tiny: wpx(9),
      /**
       * 12
       */
      little: wpx(12),
      /**
       * 14
       */
      smaller: wpx(14),
      /**
       * 16
       */
      small: wpx(16),
      /**
       * 18
       */
      normal: wpx(18),
      /**
       * 20
       */
      large: wpx(20),
      /**
       * 22
       */
      larger: wpx(22),
      /**
       * 24
       */
      heading1: wpx(24),
      /**
       * 28
       */
      heading2: wpx(28),

      avatar: wpx(40),
      letter: wpx(0),
      wpx,
    },
    portrait: {
      tabbar: wpx(48),
      device_width: width,
      device_height: height,
      masonry_column: 2,
      padding: {
        /**
         * 2
         */
        tiny: wpx(2), //2
        /**
         * 4
         */
        smaller: wpx(4), //4
        /**
         * 8
         */
        small: wpx(8), //8
        /**
         * 12
         */
        medium: wpx(12), //12
        /**
         * 16
         */
        default: wpx(16), //16
        /**
         * 18
         */
        large: wpx(18),
        /**
         * 20
         */
        larger: wpx(20),
        /**
         * 24
         */
        huge: wpx(24),
      },

      border_radius: 4,
      oval_radius: 32,
      elevation: 2,
      input_height: 48,
      border: 1,

      //font text ,icon
      /**
       * 9
       */
      tiny: wpx(9),
      /**
       * 12
       */
      little: wpx(12),
      /**
       * 14
       */
      smaller: wpx(14),
      /**
       * 16
       */
      small: wpx(16),
      /**
       * 18
       */
      normal: wpx(18),
      /**
       * 20
       */
      large: wpx(20),
      /**
       * 22
       */
      larger: wpx(22),
      /**
       * 24
       */
      heading1: wpx(24),
      /**
       * 28
       */
      heading2: wpx(28),
      avatar: wpx(40),
      letter: wpx(0),
      wpx,
    },
  },
};
