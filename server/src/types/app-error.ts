export class AppErro extends Error {
    constructor(
        public readonly statusCode: number,
        message: string,
        public readonly details?: unknown,
    ) {
        super(message)
        this.name = "AppError";
    }
}

export class NotFoundError extends AppErro {
    constructor (messsage: string | "Resource not found"){
        super(404, messsage)
        this.name = "NotFoundError";
    }
}

export class ValidationError extends AppErro {
    constructor(message: string | "Validation failde", details?: unknown){
        super(400, message, details);
        this.name = "ValidationError"
    }
}


export class UnAuthorizeError extends AppErro {
    constructor(message: "Unauthorized"){
        super(401, message);
        this.name = "UnauthorizedError"
    }
}

export class ConflictError extends AppErro {
    constructor(message: "Conflict"){
        super(409, message)
        this.name = "ConflictedError"
    }
}