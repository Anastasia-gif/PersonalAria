const { request, response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'nast',
    host: 'localhost',
    database: 'postgres',
    password: '1',
    port: 5432,
});

const getUsers = (request, response) => {
    pool.query(`SELECT * FROM data_user ORDER BY id ASC`, (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM data_user WHERE id = $1 ', [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

//Для получения хэша пароля мы будем использовать пакет crypto
const Hash = require('crypto');
const { error } = require('console');

   
    const createUser = (request, response) => {
        pool.query ('INSERT INTO data_user (name, surname, email, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING *',[name, surname, email, Hash.createHash('sha256').update(password).digest('hex'), age], (error, results)=>{
            if(error){
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`); 
        });
    };

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, surname, email, age, password} = request.body;
    pool.query(
        'UPDATE data_user SET name = $1, surname = $2, email = $3, age = $4 WHERE id = $4',
        [name, surname, email, age, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }

    );
}; 

const deleteUser = (request, response) =>{
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM data_user WHERE id = $1', [id], (error, results)=>{
        if(error){
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
