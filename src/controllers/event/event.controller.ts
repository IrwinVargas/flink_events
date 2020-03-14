import { Request, Response } from "express";
import { getRepository, MoreThanOrEqual } from "typeorm";
import { Event } from '../../entity/event.entity';
import { StatusEvent } from '../../entity/statusEvent.entity';
import { Member } from '../../entity/member.entity';
import { Address } from "../../entity/address.entity";
import { Organizer } from '../../entity/organizer.entity';
import { Category } from '../../entity/category.entity';
import { Attendee } from '../../entity/attendee.entity';

const HttpStatus = require('http-status-codes');


export class EventController{
    
    async create(req: Request, res: Response){
        const {memberId} = res.locals.jwtPayload;
        let eventRepository = getRepository(Event);
        let statusRepository = getRepository(StatusEvent);
        let addressRepository = getRepository(Address);
        let organizerRepository = getRepository(Organizer);

        try {
            let event:Event = req.body;
            event.statusEvent = await statusRepository.findOne({where:{name:'ACTIVE'}});
            let member = new Member();
            member.id = memberId;

            event.member = member;
            const newAddress = await addressRepository.save(event.address);
            event.address = newAddress;
            const newEvent:Event = await eventRepository.save(event);

            await organizerRepository.save({
                idEvent: newEvent.id,
                idMember: member.id
            });
    
            res.status(HttpStatus.CREATED).json({
                ok:true,
                event:newEvent
            })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            })
        }

        
    }

    async update(req: Request, res: Response){
        const {memberId} = res.locals.jwtPayload;
        let event:Event = req.body;
        let eventRepository = getRepository(Event);
        let organizeRepository = getRepository(Organizer);
        const eventId = Number.parseInt(req.params.eventId);
        try {
                
            
            let organize = await organizeRepository.findOne({where:{
                idEvent: eventId, idMember: memberId
            }});

            if(!organize)
                res.status(HttpStatus.UNAUTHORIZED).json();
                
            const newEvent = await eventRepository.update({id: eventId},event);
    
            res.status(HttpStatus.ACCEPTED).json({
                ok:true,
                event:newEvent
            })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
    }

    

    async delete(req:Request, res:Response){
        let eventRepository = getRepository(Event);
        try {
            const event = await eventRepository.findOneOrFail({id: Number.parseInt(req.params.eventId) });
            const eventRemoved = await eventRepository.remove(event);
    
            res.status(HttpStatus.NO_CONTENT).json();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
    }
    
    async attendEvent(req:Request, res:Response){
        const {memberId} = res.locals.jwtPayload;
        let attendeeRepository = getRepository(Attendee);
        let body = req.body;

        try {

            const attendee = new Attendee();
            attendee.idAttendeeStatus = body.idAttendeeStatus;
            attendee.idEvent = body.idEvent;
            attendee.idMember = memberId;

            const newAttendee = await attendeeRepository.save(attendee);

            res.status(HttpStatus.CREATED).json({
                ok:true,
                attendee: newAttendee
            })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
        
    }

    async organizeEvent(req:Request, res:Response){
        const {memberId} = res.locals.jwtPayload;
        let organizerRepository = getRepository(Organizer);
        let body = req.body;

        try {

            const organizer = new Organizer();
            organizer.idEvent = body.idEvent;
            organizer.idMember = memberId;

            const newOrganizer = await organizerRepository.save(organizer);

            res.status(HttpStatus.CREATED).json({
                ok:true,
                organizer: newOrganizer
            })
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
    }

    async events(req:Request, res:Response){
        let eventRepository = getRepository(Event);
        let take = req.query.take || 10;
        let skip = req.query.skip || 0;

        try {
           let [events, count] = await eventRepository
                        .findAndCount({
                            where:{dateEvent:MoreThanOrEqual(new Date())
                        },skip:skip, take:take});

            if(count==0)
                return res.status(HttpStatus.NO_CONTENT).json({});

            res.json({
                ok:true,
                events,
                count
            });

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
    }

    async event(req:Request, res:Response){
        let eventRepository = getRepository(Event);
        let organaizerRepository = getRepository(Organizer);
        let attendeeRepository = getRepository(Attendee); 
        let eventId = req.params.eventId;

        try {
           let event = await eventRepository
                        .findOneOrFail(eventId,{relations: ["statusEvent", "address", "member", "category"]});
            
            let members = await attendeeRepository.findAndCount({where:{
                idEvent: event.id
            }});

            let organizers = await organaizerRepository.findAndCount({
                where:{
                    idEvent: event.id
                }
            });
            
            res.json({
                ok:true,
                event,
                members,
                organizers
            });

        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({
                ok:false,
                error:error.message
            });
        }
    }

    async status(req:Request, res:Response){
        let statusEventRepository = getRepository(StatusEvent);
        let take = req.query.take || 10;
        let skip = req.query.skip || 0;
        
        try {
            const [status, count] = await statusEventRepository.findAndCount({skip, take});
            
            if(count==0)
                return res.status(HttpStatus.NO_CONTENT).json({});

            res.json({
                ok:true,
                status,
                count
            });

        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({
                ok:false,
                error:error.message
            });
        }


    }


   
    
}

