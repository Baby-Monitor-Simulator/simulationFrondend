import axios, { type AxiosStatic } from "axios"
import type RepositoryInterface from "@/interfaces/Repository"

/**
 * Abstract base repository class that implements the RepositoryInterface.
 * Provides common functionality for API communication.
 */
export abstract class Repository implements RepositoryInterface {
    private readonly _client: any

    /**
     * Initializes a new instance of the Repository class.
     * Sets up the axios HTTP client.
     */
    constructor() {
        this._client = axios
    }

    /**
     * Returns the configured axios client instance.
     * @returns {AxiosStatic} The axios client instance.
     */
    client(): AxiosStatic {
        // TODO: Add default behaviour to the axios instance...

        return this._client
    }

    /**
     * Gets the base URL for API requests.
     * Ensures the URL ends with a trailing slash.
     * @returns {string} The base URL for API requests.
     */
    protected get baseUrl(): string {
        const base = Repository.getApiUrl()

        if (base.substr(base.length - 1) !== "/") {
            return base + "/"
        }

        return base
    }

    /**
     * Constructs a full URL by combining the base URL with the specified endpoint.
     * @param {string} endpoint - The API endpoint to append to the base URL.
     * @returns {string} The complete URL.
     */
    protected getUrl(endpoint: string): string {
        return this.baseUrl + endpoint
    }

    /**
     * Determines the appropriate API URL based on environment variables or the current hostname.
     * @returns {string} The API URL.
     */
    protected static getApiUrl() {
        if (import.meta.env.VUE_APP_API_URL) {
            return import.meta.env.VUE_APP_API_URL
        }

        if (window.location.hostname.indexOf("acceptatie.swis.nl") > -1) {
            return "http://127.0.0.1:4173/"
        }

        return "http://" + window.location.hostname + ":4173"
    }
}
