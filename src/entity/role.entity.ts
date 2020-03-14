import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { RoleByMember } from './roleByMember.entity';

@Entity({name:'role'})
export class Role {

    @PrimaryGeneratedColumn({
        name:'id_role'
    })    
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type:'bit'
    })
    enable:boolean;

    @OneToMany(type => RoleByMember, roleByMember => roleByMember.role)
    roles: Role[];
    
}