import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Member } from './member.entity';
import { Address } from "./address.entity";

@Entity({name:'member_information'})
export class MemberInformation {

    @PrimaryGeneratedColumn({
        name:'id_memeber_information'
    })    
    id?: number;

    @Column({
        name:'image_path'
    })
    imagePath: string;
    
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

    @Column()
    telephone: string;

}



