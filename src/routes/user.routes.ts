import { Router } from "express";

const userRouters = Router();

const users = [];

userRouters.get('/users', (request, response) => {
  return response.json(users);
});


userRouters.post('/users', (request, response) => {
  const { name, password, email, driver_license, admin } = request.body;

  users.push({
    id: 1,
    name,
    password,
    email,
    driver_license,
    admin,
    created_at: new Date(),
  });

  return response.status(201).send(`Usuário (${name}) cadastrado em (${new Date()}) com sucesso!`);
});

export { userRouters };