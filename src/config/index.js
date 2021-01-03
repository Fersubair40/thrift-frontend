export const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://thriftwithk.herokuapp.com/"
    : "http://localhost:5000";
