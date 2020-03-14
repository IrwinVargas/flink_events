import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity({name:'status_event'})
export class StatusEvent {

    @PrimaryGeneratedColumn({
        name:'id_status'
    })    
    id: number;

    @Column()
    name: string;
    
}