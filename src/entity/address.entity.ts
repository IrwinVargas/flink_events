import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Member } from './member.entity';

@Entity({name:'address'})
export class Address {

    @PrimaryGeneratedColumn({
        name:'id_address'
    })
    id: number;

    @Column()
    street: string;

    @Column({
        name:'street_number'
    })
    streetNumber: number;

    @Column()
    locality: string;

    @Column()
    country: string;

    @Column({
        name: 'postal_code'
    })
    postalCode: string;

    @Column()
    lat: number;

    @Column({
        type: "float"
    })
    lng: number;
    

}