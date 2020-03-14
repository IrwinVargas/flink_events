import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Address } from './address.entity';
import { RoleByMember } from './roleByMember.entity';
import { Identity } from './identity.entity';
import { Role } from "./role.entity";

@Entity({name:'member'})
export class Member {

    @PrimaryGeneratedColumn({
        name:'id_member'
    })    
    id: number;

    @Column()
    name: string;

    @Column({
     unique:true
    })
    email:string;

    @CreateDateColumn({
        name:'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name:'update_at'
    })
    updateAt: Date

    @Column({
        type:'bit'
    })
    enable: boolean;

    @ManyToMany(type => Role, role => role.id)
    @JoinTable({
        name:'role_by_member',
        joinColumns: [
            { name: 'id_member'}
        ],
        inverseJoinColumns:[{
            name:'id_role'
        }]
    })
    roles: Role[];

    @OneToMany(type => Identity, identity => identity.member)
    identities: Identity[];

}