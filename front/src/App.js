//*Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";


//*Components
import DishesForm from "./components/DishesForm";
import DishesList from "./components/DishesList";
import Header from "./components/Header";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route index path="/" element={<DishesList />} />
          <Route path="/dish/new" element={<DishesForm />} />
          <Route path="/dish/:id/edit" element={<DishesForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
