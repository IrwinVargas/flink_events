import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { Member } from "./member.entity";
import { Event } from "./event.entity";
import { AttendeeStatus } from './attendeeStatus.entity';

@Entity({name:'attendee'})
export class Attendee {

    @PrimaryGeneratedColumn({
        name:'id_attendee'
    })    
    id: number;

    @Column({
        name: 'id_member'
    })
    idMember: number;

    @Column({
        name:"id_event"
    })
    idEvent: number;

    @Column({
        name:"id_attendee_status"
    })
    idAttendeeStatus: number;
    
    
    @CreateDateColumn({
        name:'created_at'
    })
    createdAt: Date;

}