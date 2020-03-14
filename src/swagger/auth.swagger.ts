
export const login  = {
    tags: ['Authentication'],
    description: "Controller that handles authentication in the application.",
    operationId: 'login',
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    $ref: '#/components/schemas/LoginRequest'
                }
            }
        }
    },
    responses: {
        "200": {          
            description: "returns a token with a durability of three hours to use the protected methods in the api.",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                            properties:{
                                token:{
                                    type:'string',
                                    description: 'token with durability of three hours.',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6NiwiZW1haWwiOiJpcndpbjNAZ21haWwuY29tIiwiaWF0IjoxNTg0MDMzNTY5LCJleHAiOjE1ODQwNDQzNjl9.yRmapPQXbXlmA4XvOK34-ndFlyAb9KE8b4AcBXW_QVE'
                                }
                            }
                    }
                }
            }
        },
        "401":{
            description:'Token expired or you don´t have enough permissions'
        }
    }
};

export const createMember = {
    tags: ['Authentication'],
    description: "Create new member with the basic information.",
    operationId: 'createMember',
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    $ref: '#/components/schemas/CreateMemberRequest'
                }
            }
        }
    },
    responses: {
        "201": {          
            description: "returns the new member.",
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/CreateMemberRequest'
                    }
                }
            }
        },
        "401":{
            description:'Token expired or you don´t have enough permissions'
        }
    }
};

export const changePassword = {
    tags: ['Authentication'],
    description: "Change the member password.",
    operationId: 'changePassword',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    type:'object',
                    required:[
                        'oldPassword',
                        'newPassword'
                    ],
                    properties:{
                        oldPassword:{
                            type:'string',
                            example:'0lDPas$woRd'
                        },
                        newPassword:{
                            type:'string',
                            example: 'n3wP@s$w0rD'
                        }
                    }
                }
            }
        }
    },
    responses: {
        "204": {          
            description: "Password successfully changed"
        },
        "401":{
            description:'Token expired or you don´t have enough permissions'
        }
    }
};