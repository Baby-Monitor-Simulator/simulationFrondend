import { Repository } from "@/repositories/Repository"

export default class MatLabRepository extends Repository {
    // get graph data from backend
    async getGraphData(): Promise<any[]> {
        const response = await this.client().get(this.getUrl("v1/matlab/example"))
        
        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }

    // send all values to backend
    async sendInput(): Promise<any[]> {
        const response = await this.client().post(this.getUrl("v1/matlab/example"))

        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }
}


