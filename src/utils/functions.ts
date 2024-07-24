import {btoa, atob} from 'react-native-quick-base64';

export const Greeting = () => {
  const currentHour = new Date().getHours();
  let greeting = '';
  let pr;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = ' Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = ' Afternoon';
  } else {
    greeting = ' Evening';
  }

  return greeting;
};
export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
export const isValidEmail = (email: string): boolean => {
  const emailPattern: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Use the test method of the RegExp to check if the entire text matches the email pattern
  return emailPattern.test(email);
};

export const isPlainObject = (obj: any): boolean => {
  return typeof obj === 'object' && obj !== null && obj.constructor === Object;
};

export const formatCreditCardNumber = (cardNumber: string) => {
  cardNumber = cardNumber.replace(/ /g, '').replace(/-/g, '');

  const blocks: string[] = [];
  for (let i = 0; i < cardNumber.length; i += 4) {
    blocks.push(cardNumber.substr(i, 4));
  }

  const formattedCardNumber: string = blocks.join(' ');

  return formattedCardNumber;
};

export function convertToTwoDecimalPlaces(number: string | undefined) {
  if (!number) return 0;
  const numberValue = +number;

  const fixedString = Number(numberValue).toFixed(3);
  if (Number.isInteger(numberValue))
    return Number(fixedString).toFixed(0).toString() + '.00';

  // Convert it back to a number to remove leading zeros and then back to a string
  return Number(fixedString).toString();
}
export function formatRelativeTime(dateString: string): string {
  const createdAt = new Date(dateString);
  // const now = new Date();
  // const diffInMilliseconds = now.getTime() - createdAt.getTime();

  // // Calculate the difference in seconds, minutes, hours, days, and months
  // const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  // const diffInMinutes = Math.floor(diffInSeconds / 60);
  // const diffInHours = Math.floor(diffInMinutes / 60);
  // const diffInDays = Math.floor(diffInHours / 24);
  // const diffInMonths = Math.floor(diffInDays / 30); // Assuming 30 days per month

  // if (diffInSeconds < 60) {
  //   return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  // } else if (diffInMinutes < 60) {
  //   return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  // } else if (diffInHours < 24) {
  //   return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  // } else if (diffInDays < 30) {
  //   return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  // } else {
  //   // Format as "MM-DD-YYYY HH:MM:SS"
  //   const year = createdAt.getFullYear().toString();
  //   const month = (createdAt.getMonth() + 1).toString().padStart(2, "0");
  //   const day = createdAt.getDate().toString().padStart(2, "0");
  //   const hours = createdAt.getHours().toString().padStart(2, "0");
  //   const minutes = createdAt.getMinutes().toString().padStart(2, "0");
  //   const seconds = createdAt.getSeconds().toString().padStart(2, "0");
  //   return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  // }

  const year = createdAt.getFullYear().toString();
  const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
  const day = createdAt.getDate().toString().padStart(2, '0');
  const hours = createdAt.getHours().toString().padStart(2, '0');
  const minutes = createdAt.getMinutes().toString().padStart(2, '0');
  const seconds = createdAt.getSeconds().toString().padStart(2, '0');
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

export function convertTo24HourFormat(time12Hour: string) {
  const [time, period] = time12Hour.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hours24 = hours;
  if (period === 'PM' && hours !== 12) {
    hours24 += 12;
  } else if (period === 'AM' && hours === 12) {
    hours24 = 0;
  }
  return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
}

export function startCountdown(time12Hour: string) {
  const targetTime24Hour = convertTo24HourFormat(time12Hour);
  const targetTime = new Date(`2000-01-01 ${targetTime24Hour}:00`).getTime();

  const updateCountdown = () => {
    const currentTime = Date.now();
    const remainingTime = targetTime - currentTime;
    if (remainingTime <= 0) {
      clearInterval(interval);
      return '00:00:00';
    }

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  };

  const interval = setInterval(updateCountdown, 1000);
}

export function addLeadingZero(number: number): string {
  // Check if the number is less than 10
  if (number < 10) {
    // If the number is less than 10, add a leading zero and convert it to a string
    return '0' + number.toString();
  } else {
    // If the number is greater than or equal to 10, return the original number as a string
    return number.toString();
  }
}

export const encode64 = (str: string) => {
  const buff = Buffer.from(str, 'utf8');
  const base64 = buff.toString('base64');

  return base64;
};

export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const lightenColor = (color: string, factor: number) => {
  // Parse the color value if it's a hex string
  let hexColor = color;
  if (color.startsWith('#')) {
    hexColor = color.slice(1);
  }

  // Convert hex to RGB
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Calculate the lightened RGB values
  const newR = Math.min(r + (255 - r) * factor, 255);
  const newG = Math.min(g + (255 - g) * factor, 255);
  const newB = Math.min(b + (255 - b) * factor, 255);

  // Convert back to hex
  const newHexColor = `#${Math.round(newR)
    .toString(16)
    .padStart(2, '0')}${Math.round(newG)
    .toString(16)
    .padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;

  return newHexColor;
};

export const CapitalizeFirstLetter = (str: string) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return;
  }
};

export const Capitalize = (str: string) => {
  if (str) {
    return str.toUpperCase();
  } else {
    return;
  }
};

export const makeColorTranslucent = (
  color: string,
  translucentFactor: number,
) => {
  // Parse the color string to extract red, green, and blue components
  const parsedHex = color.replace(/^#/, ''); // Remove '#' if present
  const r = parseInt(parsedHex.substring(0, 2), 16);
  const g = parseInt(parsedHex.substring(2, 4), 16);
  const b = parseInt(parsedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${translucentFactor})`;
};

export const copyToClipboard = async (value: string) => {
  // try {
  //   await Clipboard.setStringAsync(value);
  //   ShowMessageCustom("Copied to clipboard", "success");
  // } catch (error) {
  //   ShowMessageCustom("Failed to copy to clipboard", "danger");
  // }
};

export function formatDate(dateString: string, format?: string): string {
  if (dateString) {
    const date = new Date(dateString);

    if (!format) {
      format = 'yyyy-MM-dd'; // Default format
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Define the format mappings
    const formatMappings: {[key: string]: string} = {
      yyyy: date.getFullYear().toString(),
      MM: (date.getMonth() + 1).toString().padStart(2, '0'),
      dd: date.getDate().toString().padStart(2, '0'),
      MMMM: date.toLocaleDateString('en-US', {month: 'long'}),
    };

    // Replace format placeholders with corresponding values
    const formattedDate = format.replace(
      /yyyy|MM|dd|MMMM/g,
      match => formatMappings[match],
    );
    return formattedDate;
  } else return '___';
}

export function makeColorTransparent(color: string, alpha: number): string {
  // Ensure alpha is within the valid range [0, 1]
  const clampedAlpha = Math.min(1, Math.max(0, alpha));

  let r: number, g: number, b: number;

  if (color.startsWith('#')) {
    // Parse hexadecimal color
    const parsedColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    if (!parsedColor) {
      throw new Error(
        'Invalid color format. Please provide a valid hex color code.',
      );
    }

    [, r, g, b] = parsedColor.map(hex => parseInt(hex, 16));
  } else if (color.startsWith('rgb(') || color.startsWith('rgba(')) {
    // Parse RGB or RGBA color
    const parsedColor = color.match(/\d+/g);

    if (!parsedColor || parsedColor.length !== 3) {
      throw new Error(
        'Invalid color format. Please provide a valid RGB or RGBA color code.',
      );
    }

    [r, g, b] = parsedColor.map(Number);
  } else {
    throw new Error(
      'Invalid color format. Please provide a valid hex or RGB color code.',
    );
  }

  // Construct the rgba color with the specified alpha
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}

export function decodeBase64UrlSafe(base64Url: string) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with `=` characters if needed
  const decoded = atob(
    'AelY_Cspp9o_I971dB6K9BTv6CU991MOsxX7Xj1kCyVdNUvt5oHNPMQsMnoDLdEYWWn6OKkzN2pFEvwgYDY_ehwRTujeg45kWc3d-H2zmsGZExYswo23BA9LOyQ90jiX958LI2fakGTW4hcdw80L6OafSFK1ESXy1kNQT9ozCsGWqBn89zzO',
  );
  return decoded;
}

// utils/distance.js

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return distance with 2 decimal places
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
