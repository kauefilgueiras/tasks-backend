import { getRepository } from "typeorm";
import { Tasks } from '../entity/Tasks';
import { Request, Response } from "express";
 
export const getTasks = async(request: Request, response: Response) => { //Consultar Tarefas (GET)
    const tasks = await getRepository(Tasks).find()
    return response.json(tasks);
};

export const saveTask = async(request: Request, response: Response) => { //Salvar Tarefas (POST)
    const task = await getRepository(Tasks).save(request.body)
    return response.json(task);
};

export const getTask = async(request: Request, response: Response) => { // Procurar Tarefa atraves do id (lista apenas a tarefa escolhida) (GET)
    const {id} = request.params
    const task = await getRepository(Tasks).findOne(id)
    return response.json(task);
};

export const updateTask = async(request: Request, response: Response) => { // Atualizar Tarefa (UPDATE)
    const {id} = request.params
    const task = await getRepository(Tasks).update(id, request.body)
 
    if (task.affected == 1){
        const taskUpdated = await getRepository(Tasks).findOne(id)
        return response.json(taskUpdated);
    }
    else{
        return response.status(404).json( {message: 'Tarefa não encontrada!'} )
    }
};
 
export const deleteTask = async(request: Request, response: Response) => { // Deletar tarefa, atraves do id (DELETE)
    const {id} = request.params
    const task = await getRepository(Tasks).delete(id)
 
    if (task.affected == 1){
        return response.status(200).json( {message: "Tarefa excluída com sucesso!"} );
    }
    else{
        return response.status(404).json( {message: 'Tarefa não encontrada!'} )
    }
};
export const finishedTask = async(request: Request, response: Response) => { // Marcar tarefa como finalizada
    const {id} = request.params
    const task = await getRepository(Tasks).update(id, {
        finished: true,
    })
 
    if (task.affected == 1){
        const taskFinished = await getRepository(Tasks).findOne(id)
        return response.json(taskFinished);
    }
    else{
        return response.status(404).json( {message: 'Tarefa não encontrada!'} )
    }
};
