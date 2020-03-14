import { type } from 'os';
export const categoriesCatalog = {
    tags: ['Category'],
    description: "catalog of event categories ",
    operationId: 'categoriesCatalog',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "take",
          in: "query",
          description: "number of categories per page",
          required: false,
          schema: {
            type: "integer",
            format: "int32"
          }
        },{
            name: "skip",
            in: "query",
            description: "number of skipped categories",
            required: false,
            schema: {
              type: "integer",
              format: "int32"
            }
          }
    ],
    responses: {
        "200": {          
            description: "get event categories successfully.",
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
                                example:34   
                            }
                        }
                    }
                }
            }
        }
    }
}

export const eventsByCategories = {
    tags: ['Category'],
    description: "categories with all its events",
    operationId: 'eventsByCategories',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
          name: "take",
          in: "query",
          description: "number of categories per page",
          required: false,
          schema: {
            type: "integer",
            format: "int32"
          }
        },{
            name: "skip",
            in: "query",
            description: "number of skipped categories",
            required: false,
            schema: {
              type: "integer",
              format: "int32"
            }
          },{
              name:"categoryId",
              in: "path",
              description: "category identifier",
              required: true,
              schema:{
                type: "integer",
                format: "int32"  
              }
          }
    ],
    responses: {
        "200": {          
            description: "get event categories successfully.",
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
                                    },
                                    enable:{
                                        type:"boolean",
                                        example:true
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