
export class HttpError implements Error {
	name: string;
	message: string;
	status: number;
	
	constructor(message: string, status: number = 500) {
		this.name = "HttpError";
		this.message = message;
		this.status = status;
	}
}