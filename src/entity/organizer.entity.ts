import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Member } from "./member.entity";
import { Event } from "./event.entity";

@Entity({name:'organizer'})
export class Organizer {

    @PrimaryGeneratedColumn({
        name:'id_organizer'
    })    
    id?: number;

    @Column({
        name:'id_member'
    })
    idMember: number;

    @Column({
        name:"id_event"
    })
    idEvent: number;

    @Column({
        name:'created_at'
    })
    createdAt: Date;

}