export const CreateMemberRequest = {
    type:'object',
    required:[
        'name',
        'hash',
        'adapter',
        'email'   
    ],
    properties:{
        name:{
            type:'string',
            example: 'irwin'
        },
        hash:{
            type: 'string',
            writeOnly: true,
            example:'m1C0nTr@s3n1@'
        },
        adapter:{
            type: 'string',
            enum: ['local', 'google']
        },
        email:{
            type:'string',
            example:'example@example.com'
        }
    }
}