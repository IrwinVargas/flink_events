import { type } from 'os';

export const EventRequest = {
    type:'object',
    properties:{
        title: {
            type:"string",
            example:'Tecnologies'
        },
    	description: {
            type:"string",
            example:"Deveplopment description"
        },
    	dateEvent: {
            type:"date",
            example:"2020-05-22"
        },
    	startAt:{
            type:"date-time",
            example:"02:00:00"
        },
    	endAt:{
            type:"date-time",
            example:"03:00:00"
        } ,
    	imagePath: {
            type:"string",
            example:"http://pathimage/image.png"
        },
        idCategory:{
            type:"integer",
            example:3
        },
    	address:{
            type:"object",
            properties:{
                street:{
                    type:"string",
                    example:"calle"
                },
                streetNumber:{
                    type:"integer",
                    example:3
                },
                locality:{
                    type:"string",
                    example:"cdmx"
                },
                country:{
                    type:"string",
                    example:"México"
                },
                postalCode:{
                    type:"string",
                    example:"09800"
                },
                lat:{
                    type:"float",
                    example:41.403381
                },
                lng: {
                    type:"float",
                    example:2.174030
                }
            }
    	}
    }
}