'use strict';

const apiUrl = (path, req) => {
  if (!req && typeof window !== "undefined") return path;
  const host = req
    ? req.headers["x-forwarded-host"] || req.headers.host
    : window.location.host;
  const proto = req
    ? req.headers["x-forwarded-proto"] || "http"
    : window.location.protocol.slice(0, -1);
  return `${proto}://${host}${path}`;
};

export default apiUrl;
