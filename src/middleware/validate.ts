import { Request, Response,  NextFunction } from "express";
import Joi from "joi";
import {UserInfo, LoginInfo, UpdateInfo} from '../types/user'

class Validate{
    private joi = Joi;

    validate = async ( schema : Joi.ObjectSchema, data : any ,res : Response, next : NextFunction) : Promise<void> => {
        const { error } = schema.validate(data);
        if(error){
            res.status(400).json({
                isSuccessful : false,
                error:error.message
            });
            return;
        }
        next();
    }

    signup = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<UserInfo>({
            name : this.joi.string().required(),
            isAdmin : this.joi.boolean().required(),
            mobile : this.joi.string().custom((num : string)=>{
                num.split('-').forEach(v=>{
                    if ( Number.isNaN (Number(v)) ) throw new Error('올바른 숫자를 입력해주세요.');
                });
            }),
            nickname : this.joi.string().max(15).required(),
            password : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required()
        });

        this.validate(schema,req.body,res,next);
    };

    login = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<LoginInfo>({
            nickname : this.joi.string().max(15).required(),
            password : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required()
        });

        this.validate(schema,req.body,res,next);
    }

    updateUser = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<UpdateInfo>({
            confirmPassword : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required(),
            password : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).optional(),
            nickname : this.joi.string().max(15).optional(),
        });

        this.validate(schema,req.body,res,next);
    }
}

const validator = new Validate();

export default validator;