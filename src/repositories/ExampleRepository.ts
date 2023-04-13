import { Repository } from "@/repositories/Repository"
import type ExampleInterface from "@/interfaces/ExampleInterface"

export default class extends Repository {
    async all(): Promise<ExampleInterface[]> {
        const response = await this.client().get(this.getUrl("v1/matlab/example"))

        if (!response.data) {
            throw new Error("Some Err")
        }

        return response.data
    }
}
