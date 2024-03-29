module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*');

    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    
    res.header('access-control-allow-headers', 
    'Orgin, X-Requested-With, Content-Type, accept, Authorization');


    next()
}