import * as fetch from "node-fetch";

// @ts-ignore
globalThis.fetch = fetch.default;
globalThis.Headers = fetch.Headers;
// @ts-ignore
globalThis.Request = fetch.Request;
// @ts-ignore
globalThis.Response = fetch.Response;
