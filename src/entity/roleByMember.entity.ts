import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "./role.entity";
import { Member } from "./member.entity";

@Entity({name:'role_by_member'})
export class RoleByMember {

    @PrimaryGeneratedColumn({
        name:'id_role_by_member'
    })
    id:number; 


    @ManyToOne(type => Role, role => role.id)
    @JoinColumn({
        name:'id_role'
    })
    role: Role;

    @ManyToOne(type => Member, member => member.id)
    @JoinColumn({
        name:'id_member'
    })
    member: Member;
    
    
}