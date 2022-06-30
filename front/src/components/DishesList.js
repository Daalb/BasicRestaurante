//*Libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function DishesList() {
    const [dishes,setDishes] = useState([]);
    const navigate = useNavigate();

    //*Load dishes
    const loadDishes = async() => {
        const response = await fetch("http://localhost:3030/restaurant");
        const data = await response.json();
        setDishes(data);
    }

    //*Delete a dish
    const deleteDish = async (id) => {
        try {
          await fetch(`http://localhost:3030/restaurant/${id}`, {
            method: "DELETE",
          });
          setDishes(dishes.filter((d) => d.id !== id));
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        loadDishes();
    }, []);
    

    return (
        <>
            <h1>Lista de platos</h1>
            {dishes.map((d,index) => (
                <Card
                    key={index}
                    style={{
                        marginBottom: ".7rem",
                        backgroundColor: "#1e272e",
                    }}
                >
                    <CardContent
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                            }}
                        >
                            <Typography>Nombre: {d.name}</Typography>
                            <Typography>Descripción: {d.description}</Typography>
                            <Typography>Precio: {d.price}</Typography>
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => navigate(`/restaurant/${d.id}/edit`)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => deleteDish(d.id)}
                                style={{ marginLeft: ".5rem" }}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>   
    )
}
