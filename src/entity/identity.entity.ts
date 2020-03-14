import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Member } from "./member.entity";

@Entity({name:'identity'})
export class Identity {

    @PrimaryGeneratedColumn({
        name:'id_identity'
    })    
    id: number;

    @ManyToOne(type => Member, member => member.id)
    @JoinColumn({
        name:'id_member'
    })
    member: Member;

    @Column()
    adapter: string;

    @Column()
    hash: string;

    @Column({
        name:'created_at'
    })
    createdAt:Date;

    @Column({
        name:'update_at'
    })
    updateAt:Date;

    @Column({
        type:'bit'
    })
    enable:boolean;
    
}