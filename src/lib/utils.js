import { keys } from "@mantine/utils";
import dayjs from "dayjs";
import theme from "../config/theme";

export function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
}

export function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const dateFormat = (date) =>
  dayjs(date ?? new Date()).format("DD/MM/YYYY hh:mm A");

export function paginate(array = [], page_number = 1, page_size = 10) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function priceFormat(x = 0) {
  if (!x) x = 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const setupTheme = (
  brand_color = "#663785",
  secondary_color = "#f07821"
) => {
  let colorObj = { brand: brand_color, secondary_color };
  let isRenderFirst = false;
  // if render second time then exit
  // if (isRenderFirst) return;
  // check if color exist from enterprise
  if (brand_color && secondary_color) {
    let keys = ["brand", "secondary_color"];
    keys.forEach((key) => {
      new Array(10).fill("").forEach((element) => {
        element = colorObj[key];
        theme.colors[key].push(element);
        // console.log("element>>", element);
      });
    });
  } else {
    setupTheme("#f07821", "#663785");
  }

  isRenderFirst = true;
};
