import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Event } from '../../entity/event.entity';
import { StatusEvent } from '../../entity/statusEvent.entity';
import { Member } from '../../entity/member.entity';
import { Address } from "../../entity/address.entity";
import { Organizer } from '../../entity/organizer.entity';
import { Category } from '../../entity/category.entity';
import { Attendee } from '../../entity/attendee.entity';

const HttpStatus = require('http-status-codes');


export class CategoryController{
    async categoriesCatalog(req:Request, res:Response){
        let categoryRepository = getRepository(Category);
        let take = req.query.take || 10;
        let skip = req.query.skip || 0;

        try {
            let [categories, count] = await categoryRepository.findAndCount({
                where:{enable:1},
                take:take,
                skip:skip
            });
            
            if(count==0)
                return res.status(HttpStatus.NO_CONTENT).json({});

            res.json({
                ok:true,
                categories,
                count
            });
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }   
    }

    async eventByCategory(req: Request, res: Response){
        let eventRepository = getRepository(Event);
        let take = req.query.take || 10;
        let skip = req.query.skip || 0;
        let categoryId = req.params.categoryId;

        try {
           let [events, count] = await eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect(Category, 'category', 'event.idCategory = category.id')
                .where('event.dateEvent >= NOW()')
                .andWhere(`category.id = ${categoryId}`)
                .andWhere('category.enable = 1')
                .skip(skip)
                .take(take)
                .getManyAndCount();

            if(count==0)
                return res.status(HttpStatus.NO_CONTENT).json({});

            res.json({
                ok:true,
                events,
                count
            });

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok:false,
                error:error.message
            });
        }
    }
}