import { Request, Response } from 'express';
import db from '../database/connection';

export default class UsersController {
 
  index = async(request:Request, response:Response) => {
    const trx = await db.transaction();
    const { email } = request.query;
    const search = await trx('users').innerJoin('authInfo', 'users.email', 'authInfo.email').where('authInfo.email', String(email)).first();
    await trx.commit();

    return response.json(search);
  }
}