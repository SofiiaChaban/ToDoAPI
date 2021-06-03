const { badRequest } = require('../config/errorHelper');
const Todo = require('../models/todo')

module.exports = {
    getAllTodos,
    createTodo,
    removeTodo,
    updateTodo,
    markDone,
    markUndone
}

async function getAllTodos() {
    return Todo.find()
}

async function createTodo(data) {
    const existingTodo = await Todo.findOne({ name: data.name })
    if (existingTodo) {
        throw badRequest(`todo with name '${data.name}' already exists`)
    }
    return await Todo.create(data)
}

async function removeTodo(todoId) {
    return await Todo.findByIdAndRemove(todoId);
}

async function updateTodo(todoId, payload) {
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw badRequest('Todo not exists')
    }
    const existingTodo = await Todo.findOne({ name: payload.name })
    if (existingTodo) {
        throw badRequest(`todo with name '${payload.name}' already exists`)
    }

    Object.entries(payload || {}).forEach(([key, value]) => {
        todo[key] = value;
    });

    await todo.save();
    return todo;
}

async function markDone(todoId) {
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw badRequest('Todo not exists')
    }
    todo["done"] = true;

    await todo.save();
    return todo;
}

async function markUndone(todoId) {
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw badRequest('Todo not exists')
    }
    todo["done"] = false;

    await todo.save();
    return todo;
}