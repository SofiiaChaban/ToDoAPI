const Joi = require('joi-oid')
const todoService = require('../services/todo.service')

const todoSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    done: Joi.boolean()
});

const idSchema = Joi.object({
    todoId: Joi.objectId().required()
});

const updateTodoSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string()
})

// Usually, modules for node.js are exported at the end of the file, why do you export them in the beginning?
module.exports = {
    getAllTodos,
    createTodo,
    removeTodo,
    updateTodo,
    markUndone,
    markDone,
    todoSchema,
    idSchema,
    updateTodoSchema
}

async function getAllTodos(req, res, next) {
    try {
        const result = await todoService.getAllTodos()
        return res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}

async function createTodo(req, res, next) {
    try {
        const data = req.body
        const result = await todoService.createTodo(data)
        return res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

async function removeTodo(req, res, next) {
    try {
        const todoId = req.params.todoId;
        const result = await todoService.removeTodo(todoId);
        return res.status(200).json({ delete: 'Todo was deleted' })
    }
    catch (e) {
        next(e);
    }
}

async function updateTodo(req, res, next) {
    try {
        const todoId = req.params.todoId;
        const payload = req.body;
        const result = await todoService.updateTodo(todoId, payload);
        return res.status(200).json(result)
    }
    catch (e) {
        next(e)
    }
}

async function markDone(req, res, next) {
    try {
        const todoId = req.params.todoId;
        const result = await todoService.markDone(todoId);
        return res.status(200).json(result)
    }
    catch (e) {
        next(e)
    }
}

async function markUndone(req, res, next) {
    try {
        const todoId = req.params.todoId;
        const result = await todoService.markUndone(todoId);
        return res.status(200).json(result)
    }
    catch (e) {
        next(e)
    }
}
