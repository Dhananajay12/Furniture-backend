export const APIConstants = {
	Status: {
		Success: 'Success',
		Warning: 'Warning',
		Failure: 'Failure',
	},
	StatusCode: {
		Ok: 200,
		NoContent: 204,
		BadRequest: 400,
		NotFound: 404,
		ExistingData: 409,
		InternalServerError: 500,
		ServiceUnavailable: 503,
	},
	Message: {},
	Error: {},
};

export interface CustomResponse<T> {
	message: string;
	statusCode: number;
	statusMessage: string;
	data: T;
	error: string;
}

export const customResponse = <T>(message: string, statusCode: number, statusMessage: string, data: T, error: string):CustomResponse<T> => {
	// const { message, statusCode, statusMessage, data, error } = params;

	
	if (statusMessage === APIConstants.Status.Failure && (!message || !error)) {
		console.log('\u001b[1;31m Error and Message are required for Failure response!');
		message = message || error;
		error = message || error;
		// throw new Error('Error and Message are required for the Failure response!');
	} else if (statusMessage === APIConstants.Status.Warning && !message) {
		console.log('\u001b[1;31m At least Message is required for Warning response!');
		// throw new Error('At least Message is required for the Warning response!');
	} else if (!data && !message) {
		console.log('\u001b[1;31m Sending Message is required when no data in response!');
		// throw new Error('Sending Message is required when no data in response!');
	}

	return {
		message: message,
		statusMessage: statusMessage,
		statusCode: statusCode,
		data: data,
		error: error
	};
};