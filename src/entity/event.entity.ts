import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { type } from "os";
import { StatusEvent } from './statusEvent.entity';
import { Address } from './address.entity';
import { Member } from "./member.entity";
import { Category } from './category.entity';

@Entity({name:'event'})
export class Event {

    @PrimaryGeneratedColumn({
        name:'id_event'
    })    
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        name:'date_event'
    })
    dateEvent: Date;

    @Column({
        name:'start_at',
        type:'time'
    })
    startAt: Date;

    @Column({
        name:'end_at',
        type:'time'
    })
    endAt: Date;

    @Column({
        name:'image_path'
    })
    imagePath: string;
    
    @ManyToOne(type => StatusEvent, status => status.id)
    @JoinColumn({
        name:'id_status'
    })
    statusEvent: StatusEvent;

    @ManyToOne(type => Address, address => address.id)
    @JoinColumn({
        name:'id_address'
    })
    address: Address;

    @ManyToOne(type => Member, member => member.id)
    @JoinColumn({
        name:'id_member'
    })
    member: Member;

    @Column({
        name:"id_category"
    })
    idCategory: number;


    @ManyToOne(type => Category, category => category.id)
    @JoinColumn({
        name:'id_category'
    })
    category: Category;
}