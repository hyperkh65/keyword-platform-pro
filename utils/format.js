export function formatNumber(value, options = {}) {
  const {
    emptyText = "0",
    minimum = 0,
  } = options;

  // 네이버 특수 케이스: "< 10"
  if (typeof value === "string" && value.includes("<")) {
    return "10 미만";
  }

  const number = Number(value);

  if (Number.isNaN(number) || number === null || number === undefined) {
    return emptyText;
  }

  if (number < minimum) {
    return minimum.toLocaleString();
  }

  return number.toLocaleString();
}
