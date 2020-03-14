import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity({name:'attendee_status'})
export class AttendeeStatus {

    @PrimaryGeneratedColumn({
        name:'id_status'
    })    
    id: number;

    @Column()
    name: string;

}