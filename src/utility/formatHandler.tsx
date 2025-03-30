// export const handleDecimalCount = (value: string) => {
//   // Allow only numbers and one decimal point
//   if (!/^\d*\.?\d*$/.test(value)) return value.slice(0, -1);

//   // Prevent multiple decimal points
//   const parts = value.split(".");
//   if (parts.length > 2) return value.slice(0, -1);

//   // Limit decimal places to 6
//   if (parts.length === 2 && parts[1].length > 6) {
//     return `${parts[0]}.${parts[1].slice(0, 6)}`;
//   }

//   // Define max integer limit (99 quadrillion)
//   const MAX_LIMIT = "99999999999999999"; // 17 digits (without decimals)
//   let integerPart = parts[0];

//   // If the integer part exceeds 17 digits, trim extra digits
//   if (integerPart.length > MAX_LIMIT.length) {
//     integerPart = integerPart.slice(0, MAX_LIMIT.length);
//   }

//   // Reconstruct the valid number
//   return parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
// };

export const handleDecimalCount = (value: string) => {
  // Allow only numbers and one decimal point
  if (!/^\d*\.?\d*$/.test(value)) return value.slice(0, -1);

  // Prevent multiple decimal points
  const parts = value.split(".");
  if (parts.length > 2) return value.slice(0, -1);

  // Convert leading zeros like "01123" to "0.1123"
  if (/^0\d+/.test(parts[0])) {
    return `0.${parts[0].slice(1)}${parts.length === 2 ? "." + parts[1] : ""}`;
  }

  // Limit decimal places to 6
  if (parts.length === 2 && parts[1].length > 6) {
    return `${parts[0]}.${parts[1].slice(0, 6)}`;
  }

  // Limit integer part to 30 digits
  if (parts[0].length > 30) {
    return parts[0].slice(0, 30) + (parts.length === 2 ? "." + parts[1] : "");
  }

  return value;
};

export const handleDecimalCountWithRange = (value: string) => {
  // Allow only numbers and one decimal point
  if (!/^\d*\.?\d*$/.test(value)) return value.slice(0, -1);

  // Prevent more than 2 decimal places
  const parts = value.split(".");
  if (parts.length === 2 && parts[1].length > 2) {
    value = `${parts[0]}.${parts[1].slice(0, 2)}`;
  }

  // Convert to number
  const numValue = parseFloat(value);

  // If value is greater than 100, don't allow further input
  if (numValue > 100) return value.slice(0, -1);

  return value;
};

export const handleSolanaPriceFormat = (
  price: number,
  locale: string = "en-US"
) => {
  try {
    if (!price || isNaN(price)) {
      throw new Error("Invalid price value.");
    }

    return price.toLocaleString(locale, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  } catch {
    return "0.00"; // Fallback value
  }
};
