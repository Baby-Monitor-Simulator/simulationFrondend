import axios, { type AxiosStatic } from "axios"
import type RepositoryInterface from "@/interfaces/Repository"

export abstract class Repository implements RepositoryInterface {
    private readonly _client: any

    constructor() {
        this._client = axios
    }

    client(): AxiosStatic {
        // TODO: Add default behaviour to the axios instance...

        return this._client
    }

    protected get baseUrl(): string {
        const base = Repository.getApiUrl()

        if (base.substr(base.length - 1) !== "/") {
            return base + "/"
        }

        return base
    }

    protected getUrl(endpoint: string): string {
        return this.baseUrl + endpoint
    }

    protected static getApiUrl() {
        if (process.env.VUE_APP_API_URL) {
            return process.env.VUE_APP_API_URL
        }

        if (window.location.hostname.indexOf("acceptatie.swis.nl") > -1) {
            return "http://127.0.0.1:4173/"
        }

        return "http://" + window.location.hostname + ":4173"
    }
}
