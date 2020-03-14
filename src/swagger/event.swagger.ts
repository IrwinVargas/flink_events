export const createEvent  = {
    tags: ['Event'],
    description: "Create event with address",
    operationId: 'createEvent',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    $ref: '#/components/schemas/EventRequest'
                }
            }
        }
    },
    responses: {
        "201": {          
            description: "Event created successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/EventRequest'
                    }
                }
            }
        }
    }
} 

export const updateEvent = {
    tags: ['Event'],
    description: "Update event",
    operationId: 'updateEvent',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "eventId",
          in: "path",
          description: "id event",
          required: true,
          schema: {
            type: "integer",
            format: "int32"
          }
        },
    ],
    requestBody:{
        content:{
            "application/json": {
                schema:{
                    $ref: '#/components/schemas/UpdateEventRequest'
                }
            }
        }
    },
    responses: {
        "202": {          
            description: "Event update successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/UpdateEventRequest'
                    }
                }
            }
        }
    }
}

export const deleteEvent = {
    tags: ['Event'],
    description: "Delete event",
    operationId: 'deleteEvent',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "eventId",
          in: "path",
          description: "event  id",
          required: true,
          schema: {
            type: "integer",
            format: "int32"
          }
        },
    ],
    responses: {
        "204": {          
            description: "Event deleted successfully.",
        }
    }
}

export const attendEvent = {
    tags: ['Event'],
    description: "add member as an attendee to an event",
    operationId: 'attendEvent',
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

export const organizeEvent = {
    tags: ['Event'],
    description: "add member as an organizer to an event",
    operationId: 'organizeEvent',
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
                        idEvent:{
                            type:"integer",
                            example:2
                        }
                    }
                }
            }
        }
    },
    responses: {
        "201": {          
            description: "Organizer added successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/OrganizerResponse'
                    }
                }
            }
        }
    }
}
export const events = {
    tags: ['Event'],
    description: "get events enable by page",
    operationId: 'events',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "take",
          in: "query",
          description: "number of events per page",
          required: false,
          schema: {
            type: "integer",
            format: "int32"
          }
        },{
            name: "skip",
            in: "query",
            description: "number of skipped events",
            required: false,
            schema: {
              type: "integer",
              format: "int32"
            }
          }
    ],
    responses: {
        "200": {          
            description: "get events successfully.",
            content: {
                "application/json": {
                    schema: {
                        type:"object",
                        properties:{
                            events:{
                                type:"array",
                                items:{
                                    $ref: '#/components/schemas/UpdateEventRequest'
                                }
                            },
                            count:{
                                type:"integer",
                                example:123
                            }
                        }
                    }
                }
            }
        }
    }
}

export const event = {
    tags: ['Event'],
    description: "get event by id",
    operationId: 'event',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "eventId",
          in: "path",
          description: "event identifier",
          required: true,
          schema: {
            type: "integer",
            format: "int32"
          }
        }
    ],
    responses: {
        "200": {          
            description: "get events successfully.",
            content: {
                "application/json": {
                    schema: {
                        type:"object",
                        properties:{
                            event:{
                                $ref: '#/components/schemas/UpdateEventRequest'
                            },
                            members:{
                                type:"array",
                                items:{
                                    $ref: '#/components/schemas/AttendeeResponse'
                                }
                            },
                            organizers:{
                                type:"array",
                                items:{
                                    $ref: '#/components/schemas/OrganizerResponse'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const statusEvent = {
    tags: ['Event'],
    description: "get the status that an event can have",
    operationId: 'statusEvent',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "take",
          in: "query",
          description: "number of status per page",
          required: false,
          schema: {
            type: "integer",
            format: "int32"
          }
        },{
            name: "skip",
            in: "query",
            description: "number of skipped status",
            required: false,
            schema: {
              type: "integer",
              format: "int32"
            }
          }
    ],
    responses: {
        "200": {          
            description: "get status event successfully.",
            content: {
                "application/json": {
                    schema: {
                        type:"object",
                        properties:{
                            type:"array",
                            items:{
                                type:"object",
                                properties:{
                                    id:{
                                        type:"integer",
                                        example:3
                                    },
                                    name:{
                                        type:"string",
                                        example:"CANCELLED"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}