import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";
import { prisma } from "../lib/prisma";

export function getUsers(req: Request, res: Response) 
{
    res.send([]);
}

export function getUserByID(req: Request, res: Response) 
{
    
    res.send({});
}

export function createUser(req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>, res: Response<User>) 
{
    // req.query.loginAfterCreate;
    res.status(201).send({id: "1", username: "anson", email: "anson@gmail.com"});
}