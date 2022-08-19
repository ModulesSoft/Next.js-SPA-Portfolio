module.exports = {
  basePath: "/example",
  assetPrefix: "/example",
  trailingSlash: true,
  env: {
    imagesPrefix: "/example",
    API_URL: "https://example.example/graphql",
    CAPTCHA_KEY: "example",
    REFRESH_TOKEN_ENCRYPTION_KEY: "example",
    SECRET_COOKIE_PASSWORD: "example",
    ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE: "authToken",
    REFRESH_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE: "refreshToken",
    EXPIRES_AT_INDEX_IN_TOKEN: "exp",
  },
};
