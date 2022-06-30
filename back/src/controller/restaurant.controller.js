//*Logic 
const pool = require('../db');

//*Get all dishes function
const getDishes = async(req,res,next) => {
    try{
        const result = await pool.query('SELECT * FROM dishes');
        res.status(200).json(result.rows)
    }catch(error){
        console.log("Error trying to get all dishes",error.message);
        next(error);
    }
}

//*Get one dish function
const getDish = async(req,res,next) => {
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM dishes WHERE id=$1',[id]);

        //*If the dish is not found
        if(result.rows.length === 0) return res.status(400).json({
            message: "Dish not found"
        })

        return res.json(result.rows[0])
    }catch(error){
        console.log("Error trying to get one dish",error.message);
        next(error);
    }
}

//*Create dish function
const createDish = async(req,res,next) => {
    try{
        const { name, description, price } = req.body;
        const result = await pool.query('INSERT INTO dishes (name,description,price) VALUES ($1,$2,$3) RETURNING *', [
            name,
            description,
            price
        ]);
        return res.json(result.rows[0]);
    }catch(error){
        console.log("Error creating a dish",error.message)
    }
}

//*Update dish function
const updateDish = async(req,res,next) => {
    try{
        const { id } = req.params;
        const { name, description, price } = req.body;
        const result = await pool.query('UPDATE dishes SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [
            name,
            description,
            price,
            id
        ]);

        //*If the dish is not found
        if(result.rowCount === 0) return res.status(400).json({
            message: "Dish not found"
        })

        res.json(result.rows[0])
    }catch(error){
        console.log("Error trying to update a dish",error)
        next(error);
    }
}

//*Delete dish function
const deleteDish = async(req,res,next) => {
    try{
        const { id } = req.params;
        const result = await pool.query('DELETE FROM dishes WHERE id=$1',[id]);

        //*If the dish is not found
        if(result.rowCount === 0) return res.status(400).json({
            message: "Dish not found"
        })
        return res.sendStatus(204);
    }catch(error){
        console.log("Error trying to delete one dish",error.message);
        next(error);
    }
}


module.exports = {
    getDishes,
    getDish,
    createDish,
    updateDish,
    deleteDish
}