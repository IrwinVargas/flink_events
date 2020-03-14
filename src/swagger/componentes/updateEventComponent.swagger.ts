export const UpdateEventRequest = {
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
        }
    }
}