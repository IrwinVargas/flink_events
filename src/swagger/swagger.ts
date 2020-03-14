import { createEvent, updateEvent, deleteEvent, attendEvent, organizeEvent, events, event, statusEvent } from './event.swagger';
import { login, createMember, changePassword } from './auth.swagger';
import { LoginRequest } from './componentes/loginRequest.swagger';
import { CreateMemberRequest } from './componentes/createComponent.swagger';
import { EventRequest } from './componentes/eventRequest.swagger';
import { UpdateEventRequest } from './componentes/updateEventComponent.swagger';
import { AttendeeResponse } from './componentes/attendeeResponse.swagger';
import { OrganizerResponse } from './componentes/organizeResponse.swagger';
import { categoriesCatalog, eventsByCategories } from './category.swagger';

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'API FLINK EVENTS',
        description: 'API for flink events with members and organizers of them. JWT as a way to access each service.',
        contact: {
            name: 'Irwin Vargas',
            email: 'irtvargas@gmail.com',
            url: 'http://irwin-vargas.com'
        }
    },
    servers:[
        {
            url: 'http://localhost:3001/api/v1',
            description: 'Local server'
        },
        {
            url: 'https://flink-events-staging.appspot.com/api/v1',
            description: 'Remote server'
        }
    ],
    components: {
        schemas: {
            LoginRequest: LoginRequest,
            CreateMemberRequest: CreateMemberRequest,
            EventRequest:EventRequest,
            UpdateEventRequest: UpdateEventRequest,
            AttendeeResponse:AttendeeResponse,
            OrganizerResponse:OrganizerResponse
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    tags:[
        {
            name: 'Event'
        },
        {
            name:'Category'
        },{
            name: 'Authentication'
        }
    ],
    paths:{
        "/auth/login":{
            "post": login
        },
        "/auth/register":{
            "post": createMember
        },
        "/auth/changePassword":{
            "post": changePassword
        },
        "/event/":{
            "post": createEvent,
            "get":events
        },
        "/event/{eventId}":{
            "put": updateEvent,
            "delete": deleteEvent,
            "get": event
        },
        "/event/attendEvent":{
            "post": attendEvent
        },
        "/event/organizerEvent":{
            "post": organizeEvent
        },
        "/event/statusEvent":{
            "get": statusEvent
        },
        "/category/":{
            "get": categoriesCatalog
        },
        "/category/eventsByCategory/{categoryId}":{
            "get": eventsByCategories
        }
    }
}