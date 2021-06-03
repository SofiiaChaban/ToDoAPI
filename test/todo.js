process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Todo = require("../models/todo")
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp);

describe('Todos', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET todo', () => {
        it('it should GET all the todos', (done) => {
            chai.request(app)
                .get('/api/todo')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST todo', () => {
        it('it should not POST a todo without name field', (done) => {
            let todo = {
                description: "sample description 1"
            }
            chai.request(app)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eql('Error validating request body. "name" is required.')
                    done();
                });
        });

        it('it should POST a todo ', (done) => {
            let todo = {
                name: "Todo #1",
                description: "new todo",
            }
            chai.request(app)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    done();
                });
        });
    });

    describe('/PUT/:id todo', () => {
        it('it should UPDATE a todo given the id', (done) => {
            let todo = new Todo({ name: "Todo #4", description: "sample descriprion" })
            todo.save((err, todo) => {
                chai.request(app)
                    .put('/api/todo/' + todo.id)
                    .send({ name: "Updated todo#4" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql("Updated todo#4");
                        res.body.should.have.property('description').eql("sample descriprion");
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id todo', () => {
        it('it should DELETE a todo given the id', (done) => {
            let todo = new Todo({ name: "Todo #5", description: "sample description" })
            todo.save((err, todo) => {
                chai.request(app)
                    .delete('/api/todo/' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('delete').eql('Todo was deleted');
                        done();
                    });
            });
        });
    });

    describe('/PUT/:id/done todo', () => {
        it('it should UPDATE (set done:true) a todo given the id', (done) => {
            let todo = new Todo({ name: "Todo #7", description: "sample description" })
            todo.save((err, todo) => {
                chai.request(app)
                    .put('/api/todo/' + todo.id + '/done')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('done').eql(true);
                        done();
                    });
            });
        });
    });

    describe('/PUT/:id/undone todo', () => {
        it('it should UPDATE (set done:false) a todo given the id', (done) => {
            let todo = new Todo({ name: "Todo #8", description: "sample description", done: true })
            todo.save((err, todo) => {
                chai.request(app)
                    .put('/api/todo/' + todo.id + '/undone')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('done').eql(false);
                        done();
                    });
            });
        });
    });

});
