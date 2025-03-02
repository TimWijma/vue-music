import { SPOTIFY_TOKEN } from "./globals";

/**
 * Fetch wrapper
 *
 * Example usage:
 * Fetch.get("url", {search: "param"})
 *      .then((data) => { ... }
 *      .catch((error) => { ... }
 *
 * When you have to wait for a response, use await Fetch.method()
 *
 * Params parameter are for query string parameters:
 * {search: "param", page: 1} will result in url?search=param&page=1
 *
 * Body parameter is for the body of the request.
 * You can pass an already stringified JSON object or a JS object.
 */
export class Fetch {
    static async get(url: string, params: any = {}, token: boolean = false) {
        let apiUrl = Fetch.createUrl(url, params);
        return fetch(apiUrl, {
            headers: token
                ? {
                      Authorization: "Bearer " + SPOTIFY_TOKEN,
                  }
                : {},
            method: "GET",
        }).then(Fetch.responseHandler);
    }

    static async post(url: string, body: any = {}, params: any = {}) {
        let apiUrl = Fetch.createUrl(url, params);

        const requestBody = typeof body === "string" ? body : JSON.stringify(body);

        return fetch(apiUrl, {
            method: "POST",
            body: requestBody,
        }).then(Fetch.responseHandler);
    }

    static async put(url: string, body: any = {}, params: any = {}) {
        let apiUrl = Fetch.createUrl(url, params);

        const requestBody = typeof body === "string" ? body : JSON.stringify(body);

        return fetch(apiUrl, {
            method: "PUT",
            body: requestBody,
        }).then(Fetch.responseHandler);
    }

    static async delete(url: string, params: any = {}) {
        let apiUrl = Fetch.createUrl(url, params);
        return fetch(apiUrl, {
            method: "DELETE",
        }).then(Fetch.responseHandler);
    }

    private static async responseHandler(response: Response) {
        if (!response.ok) {
            let error = {
                status: response.status,
                statusText: response.statusText,
                message: "",
                url: response.url,
            };

            const text = await response.text();

            if (text) {
                try {
                    error.message = JSON.parse(text);
                } catch (e) {
                    error.message = text;
                }
            }

            return Promise.reject(error);
        }

        return response.text().then((text) => {
            if (!text) null;

            try {
                return JSON.parse(text);
            } catch (error) {
                return text;
            }
        });
    }

    private static createUrl(url: string, params: any = {}) {
        let apiUrl = new URL(url);
        apiUrl.search = new URLSearchParams(params).toString();
        return apiUrl;
    }
}
