const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})

const todoController = require('../controllers/todo');

router
    .get('/', todoController.getAllTodos)
    .post('/', validator.body(todoController.todoSchema), todoController.createTodo);

router
    .delete('/:todoId', validator.params(todoController.idSchema), todoController.removeTodo)
    .put('/:todoId', validator.params(todoController.idSchema), todoController.updateTodo)

router
    .put('/:todoId/done', validator.params(todoController.idSchema), todoController.markDone)
    .put('/:todoId/undone', validator.params(todoController.idSchema), todoController.markUndone)


module.exports = router;