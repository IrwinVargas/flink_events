export const saveMember = {
    tags: ['Member'],
    description: "add a member",
    operationId: 'saveMember',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    type:"object",
                    properties:{
                        idAttendeeStatus:{
                            type:"integer",
                            example:2
                        },
                        idEvent:{
                            type:"integer",
                            example:3
                        }
                    }
                }
            }
        }
    },
    responses: {
        "201": {          
            description: "Attendee added successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/AttendeeResponse'
                    }
                }
            }
        }
    }
}