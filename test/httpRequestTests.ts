// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpRequest } from "../lib/httpRequest";
import * as assert from "assert";

describe("HttpRequest", () => {
    describe("constructor", () => {
        it(`should throw an Error when the url is ""`, () => {
            try {
                new HttpRequest("GET", "", {});
                assert.fail("Should have thrown an error.");
            } catch (error) {
                assert.notEqual(error, null);
                assert.strictEqual(error.message, `"" is not a valid URL for a HttpRequest.`);
            }
        });

        it(`should return a valid GET HttpRequest when the url is "www.example.com"`, () => {
            const httpRequest: HttpRequest = new HttpRequest("GET", "www.example.com", {});
            assert.strictEqual(httpRequest.httpMethod, "GET");
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers, {});
            assert.strictEqual(httpRequest.body, undefined);
        });

        it(`should return a valid POST HttpRequest when the body is undefined`, () => {
            const httpRequest: HttpRequest = new HttpRequest("POST", "www.example.com", {});
            assert.strictEqual(httpRequest.httpMethod, "POST");
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers, {});
            assert.strictEqual(httpRequest.body, undefined);
        });

        it(`should return a valid POST HttpRequest when the body is ""`, () => {
            const httpRequest: HttpRequest = new HttpRequest("POST", "www.example.com", {}, "");
            assert.strictEqual(httpRequest.httpMethod, "POST");
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers, {});
            assert.strictEqual(httpRequest.body, "");
        });

        it(`should return a valid POST HttpRequest when the body is "hello"`, () => {
            const httpRequest: HttpRequest = new HttpRequest("POST", "www.example.com", {"Content-Length": 5}, "hello");
            assert.strictEqual(httpRequest.httpMethod, "POST");
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers, {"Content-Length": 5});
            assert.strictEqual(httpRequest.body, "hello");
        });
    });
});