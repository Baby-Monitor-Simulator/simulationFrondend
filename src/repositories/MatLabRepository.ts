import { Repository } from "@/repositories/Repository"
import type ExampleInterface from "@/interfaces/ExampleInterface"

export default class MatLabRepository extends Repository {
    // get graph data from backend
    async getGraphData(): Promise<ExampleInterface[]> {
        const response = await this.client().get(this.getUrl("v1/matlab/example"))

        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }

    // send all values to backend
    async sendInput(): Promise<ExampleInterface[]> {
        const response = await this.client().post(this.getUrl("v1/matlab/example"))

        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }
}


