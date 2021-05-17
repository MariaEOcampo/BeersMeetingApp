import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./services/Auth/Login";
import SignUp from "./services/Auth/SignUp";
import AdminPage from "./components/AdminPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin" component={AdminPage} />
        <ToastContainer />
      </Layout>
    </Router>
  );
}

export default App;
