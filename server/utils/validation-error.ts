export class ValidationError implements Error {
	name: string;
	message: string;
	status: number;
    errors: any;
	
	constructor(message: string,errors:any, status: number = 422) {
		this.name = "ValidationError";
		this.message = message;
        this.errors = errors;
        //status 
		this.status = status;
	}
}