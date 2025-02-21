
export class Api {
    #url
    constructor() {
        this.#url = `${process.env.REACT_APP_API}/api/`
    }

    async get(endpoint) {
        const URL = this.#url.concat(endpoint)
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const results = await response.json()

        return { response, results }
    }

    async post(endpoint, data = {}) {
        const URL = this.#url.concat(endpoint)
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data)
        });

        const result = await response.json()

        return { response, result }
    }

    async put(endpoint, data) {
        const URL = this.#url.concat(endpoint)
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data)
        });

        return response
    }

    async delete(endpoint, id) {
        const URL = this.#url.concat(endpoint).join('/').concat(id)

        const response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json()
    }
}