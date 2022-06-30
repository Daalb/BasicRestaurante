//*Libraries
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

export default function DishesForm() {
    //*State variables
    const [dish, setDish] = useState({
        name: "",
        description: "",
        price: 0
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    //*Hooks
    const navigate = useNavigate();
    const params = useParams();

    //*Load one dish
    const loadDish = async (id) => {
        const res = await fetch("http://localhost:3030/restaurant/" + id);
        const data = await res.json();
        setDish({ name: data.name, description: data.description, price: data.price });
        setEditing(true);
    };

    //*?To know if a dish is being edited
    useEffect(() => {
        if (params.id) {
            loadDish(params.id);
        }
    }, [params.id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
          if (editing) {
            const response = await fetch(
                "http://localhost:3030/restaurant/" + params.id,
                {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dish),
                }
            );
            await response.json();
          } else {
            const response = await fetch("http://localhost:3030/restaurant", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dish),
            });
            await response.json();
          }
          setLoading(false);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
    };

    //?To catch the change on the form
    const handleChange = (e) => setDish({ ...dish, [e.target.name]: e.target.value });

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: "#1E272E",
                        padding: "1rem",
                    }}
                >
                    <Typography variant="h5" textAlign="center" color="white">
                        {editing ? "Actualizar plato" : "Crear plato"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="filled"
                                label="Ingrese nomrbe"
                                sx={{
                                    display: "block",
                                    margin: ".5rem 0",
                                }}
                                name="name"
                                onChange={handleChange}
                                value={dish.name}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant="filled"
                                type="number"
                                label="Ingrese un precio"
                                multiline
                                sx={{
                                    display: "block",
                                    margin: ".5rem 0",
                                }}
                                name="price"
                                onChange={handleChange}
                                value={dish.price}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant="outlined"
                                label="Ingrese una descripcon"
                                multiline
                                rows={4}
                                sx={{
                                    display: "block",
                                    margin: ".5rem 0",
                                }}
                                name="description"
                                onChange={handleChange}
                                value={dish.description}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                           
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!dish.name || !dish.description}
                            >
                                {loading ? (
                                <CircularProgress color="inherit" size={25} />
                                ) : (
                                "Save"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
