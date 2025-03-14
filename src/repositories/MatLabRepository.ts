import { Repository } from "@/repositories/Repository"

/**
 * Repository class for handling MatLab-related API operations.
 * Extends the base Repository class.
 */
export default class MatLabRepository extends Repository {
    /**
     * Retrieves graph data from the backend.
     * Makes a GET request to the MatLab example endpoint.
     * 
     * @returns {Promise<any[]>} A promise that resolves to an array of graph data.
     * @throws {Error} If the response data is missing or invalid.
     */
    async getGraphData(): Promise<any[]> {
        const response = await this.client().get(this.getUrl("v1/matlab/example"))
        
        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }

    /**
     * Sends input values to the backend.
     * Makes a POST request to the MatLab example endpoint.
     * 
     * @returns {Promise<any[]>} A promise that resolves to an array of response data.
     * @throws {Error} If the response data is missing or invalid.
     */
    async sendInput(): Promise<any[]> {
        const response = await this.client().post(this.getUrl("v1/matlab/example"))

        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }
}


