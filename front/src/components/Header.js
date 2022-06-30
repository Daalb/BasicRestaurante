import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: "none", color: '#eee'}}>
                    Restaurante Jose
                </Link>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/dish/new")}
              >
                Agregar plato
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
}
