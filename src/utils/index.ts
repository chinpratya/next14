import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export * from './getColLayout';
export * from './uid';
export * from './format';
export * from './convertCase';
export * from './queryString';
export * from './getKeysOfObject';
export * from './array';
export * from './color';
export * from './url';
export * from './validation';
export * from './consent-utils';
export * from './file';
export * from './policy-utils';

class Utils {
  /**
   * Get accessible color contrast
   * @param {String} hex - Hex color code e.g '#3e82f7'
   * @return {String} 'dark' or 'light'
   */
  static getColorContrast(hex: string) {
    if (!hex) {
      return 'dark';
    }
    const threshold = 130;
    const hRed = hexToR(hex);
    const hGreen = hexToG(hex);
    const hBlue = hexToB(hex);

    function hexToR(h: string) {
      return parseInt(cutHex(h).substring(0, 2), 16);
    }

    function hexToG(h: string) {
      return parseInt(cutHex(h).substring(2, 4), 16);
    }

    function hexToB(h: string) {
      return parseInt(cutHex(h).substring(4, 6), 16);
    }

    function cutHex(h: string) {
      return h.charAt(0) === '#' ? h.substring(1, 7) : h;
    }

    const cBrightness =
      (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
    if (cBrightness > threshold) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  /**
   * Get Breakpoint
   * @param {Object} screens - Grid.useBreakpoint() from antd
   * @return {Array} array of breakpoint size
   */
  static getBreakPoint(screens: {
    [key: string]: boolean;
  }) {
    const breakpoints = [] as string[];
    for (const key in screens) {
      if (screens.hasOwnProperty(key)) {
        const element = screens[key];
        if (element) {
          breakpoints.push(key);
        }
      }
    }
    return breakpoints;
  }

  /**
   * Get Navigation Module
   * @param {String} pathname - router.pathname
   */
  static getNavigationModule(pathname: string): string {
    const path = pathname.split('/');
    return path[3];
  }

  /**
   * Get Navigation App
   * @param pathname - router.pathname
   */
  static getNavigationApp(pathname: string): string {
    const path = pathname.split('/');
    return path[2];
  }

  static getNavigationRoot(url: string): string {
    const path = url.split('/');
    return path[1];
  }

  /**
   * Get Navigation Module
   * @param pathname - router.pathname
   */
  static navigateSelectedKeys(pathname: string) {
    const selectedKeyFour = pathname.split('/');
    const selectedKeyFive = pathname.split('/');
    const selectedKeySix = pathname.split('/');

    selectedKeyFour.length = 4;
    selectedKeyFive.length = 5;
    selectedKeySix.length = 6;

    return [
      pathname,
      selectedKeyFour.join('/'),
      selectedKeyFive.join('/'),
      selectedKeySix.join('/'),
    ];
  }

  /**
   * Convert array string to options
   * @param array - array of string or number
   */
  static convertArrayToOptions(
    array?: string[] | number[]
  ) {
    if (!array) return [];
    return array.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }

  /**
   * Convert array string to options
   * @param date - date string
   * @param startDay - start day string
   */
  static calculateRemainingDays(
    date?: string,
    startDay?: string
  ) {
    if (!date) return null;
    const today = startDay
      ? dayjs(startDay).toString()
      : dayjs().toString();
    const reminderDate = dayjs(date).toString();
    return dayjs(today).to(reminderDate);
  }

  /**
   * Generate random color by first character
   * @param string - string
   */

  static generateRandomColor(character?: string) {
    if (!character) return '#3e79f7';
    const colors = [
      '#f5222d',
      '#fa541c',
      '#fa8c16',
      '#faad14',
      '#fadb14',
      '#a0d911',
      '#52c41a',
      '#13c2c2',
      '#1890ff',
      '#2f54eb',
      '#722ed1',
      '#eb2f96',
    ];
    const index = character.charCodeAt(0) % colors.length;
    return colors.reverse()[index];
  }

  static useRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const color = `rgb(${r}, ${g}, ${b})`;

    return color;
  }

  /**
   * Format decimal
   * @param value - number
   * @param decimal - number of decimal
   */
  static formatDecimal(value: number, decimal?: number) {
    return (Math.round(value * 100) / 100).toFixed(
      decimal ?? 2
    );
  }
}

export default Utils;
