const { request, response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'api_user',
    host: 'localhost',
    database: 'api',
    password: 'pa$sw0rd',
    port: 5432,
});

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1 ', [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

//Для получения хэша пароля мы будем использовать пакет crypto
const Hash = require('crypto');
    // Создаём хэш обьект затем используйте hash.update() для добавления данных из val в Hash и hash.digest() для вычисления дайджеста данных.
    Hash.createHash('sha256').update(password).digest('hex');