export const AttendeeResponse = {
    type:'object',
    properties:{
        id:{
            type:'integer',
            example: 3
        },
        idMember:{
            type: 'integer',
            example:3
        },
        idEvent:{
            type: 'integer',
            example:3
        },
        idAttendeeStatus:{
            type:'integer',
            example:3
        },
        createdAt:{
            type:'date',
            example:'2017-02-20'
        }
    }
}
