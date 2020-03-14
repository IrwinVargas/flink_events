export const LoginRequest = {
    type:'object',
    required:[
        'hash',
        'adapter',
        'email'   
    ],
    properties:{
        hash:{
            type: 'string',
            writeOnly: true,
            example:'m1C0nTr@s3n1@'
        },
        adapter:{
            type: 'string',
            enum: ['local', 'google']
        } ,
        email:{
            type:'string',
            example:'example@example.com'
        }
    }
}