import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Category } from './category.entity';
import { Event } from './event.entity';

@Entity({name:'category_by_event'})
export class CategoryByEvent {

    @ManyToOne(type => Category, address => address.id, { primary: true })
    @JoinColumn({
        name:'id_category'
    })
    category: Category;

    @ManyToOne(type => Event, event => event.id, { primary: true })
    @JoinColumn({
        name:'id_event'
    })
    event: Event;
    
    

}