import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../helpers/history";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import BoardUser from "../components/BoardUser";
import BoardSpec from "../components/BoardSpec";
import BoardAdmin from "../components/BoardAdmin";
import AddVisit from "../components/AddVisit";
import VisitsList from "../components/VisitsList";
import Visit from "../components/Visit";
import ArchiveVisitsList from "../components/ArchiveVisitsList";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import SpecNav from "./SpecNav";
import NonAuth from "../components/pieces/SideBar";
import TopBar from "../components/pieces/TopBar";
// pages
import HomePage from "../pages/HomePage/";
import AboutUsPage from "../pages/AboutUsPage/";
import OfferPage from "../pages/OfferPage/";
import PriceListPage from "../pages/PriceListPage/";
import ContactPage from "../pages/ContactPage/";
import AddVisitPage from "../pages/AddVisitPage/";

import { logout } from "../store/actions/auth";
import { clearMessage } from "../store/actions/message";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  return currentUser === null ? <Navigate to="/login" /> : children;
}

const RootNavigation = () => {
  const [showSpecBoard, setShowSpecBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes("ROLE_SPEC"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter history={history}>
      <>
        <nav>
          {currentUser ? (
            <li>
              <a href="/login" onClick={logOut}>
                Wyloguj
              </a>
            </li>
          ) : (
            <TopBar />
          )}
          {showSpecBoard && <SpecNav />}
          {showAdminBoard && <AdminNav />}
          {showUserBoard && <UserNav />}
          <NonAuth />
        </nav>
        <>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/about-us" element={<AboutUsPage />} />
            <Route exact path="/offer" element={<OfferPage />} />
            <Route exact path="/price-list" element={<PriceListPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/add-visit" element={<AddVisit />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/spec" element={<BoardSpec />} />
            <Route path="/admin" element={<BoardAdmin />} />

            <Route
              path="/visits"
              element={
                <PrivateRoute>
                  <VisitsList />
                </PrivateRoute>
              }
            />
            <Route
              path="visits/:id"
              element={
                <PrivateRoute>
                  <Visit />
                </PrivateRoute>
              }
            />
            <Route
              path="archive-visits"
              element={
                <PrivateRoute>
                  <ArchiveVisitsList />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      </>
    </BrowserRouter>
  );
};

export default RootNavigation;
