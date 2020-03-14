import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity({name:'category'})
export class Category {

    @PrimaryGeneratedColumn({
        name:'id_category'
    })    
    id: number;

    @Column()
    name: string;

    @Column({
        type:'bit'
    })
    enable: boolean;


}