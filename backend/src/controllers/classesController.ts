import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import hashPassword from '../utils/hashPassword';
import { Request, Response } from 'express';

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}


export default class ClassesController {
  
   create = async(request:Request, response:Response) => {
    const { name, avatar, email, whatsapp, bio, cost, schedule, subjects, password, CPF } = request.body;
    const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      email,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx('classes').insert({
      subjects,
      cost,
      user_id
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: Schedule) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      };
    });

    await trx('classes_schedule').insert(classSchedule);

    await trx('authInfo').insert({
      email,
      CPF,
      password: await hashPassword(password),
    })

    await trx.commit();
    
    return response.status(201).json({message: 'Aula criada! com sucesso!'});

  } catch (error) {
    console.log(error);
    await trx.rollback();
    return response.status(400).json({
      error: 'Unexpected Error while creating a new class/user'
    });
  };
}

  index = async(request:Request, response:Response) => {
    const filters = request.query;
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Error while filtering your query, please try again'
      });
    }

    const timeInMinutes = convertHourToMinutes(filters.time as string);

    const classes = await db('classes')
    .whereExists(function(){
      this.select('classes_schedule.*')
        .from('classes_schedule')
        .whereRaw('`classes_schedule`. `class_id` = `classes`.`id`')
        .whereRaw('`classes_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`classes_schedule`. `from` <= ??', [timeInMinutes])
        .whereRaw('`classes_schedule`.`to` > ??', [timeInMinutes])
    })
    .where('classes.subjects', '=', subject)
    .join('users', 'classes.user_id', 'users.id')
    .select(['classes.*', 'users.*']);

    return response.json({
      message: 'Sucesso',
      horario: timeInMinutes,
      classes,
    });
  }
}