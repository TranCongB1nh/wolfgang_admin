import { Brands } from "../components/Brands/Brands";
import { Categories } from "../components/Categories/Categories";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Vouchers } from "../components/FLashSale/Vouchers";
import { Orders } from "../components/Orders/Orders";
import { Products } from "../components/Products/Products";
import { Slides } from "../components/Slides/Slides";
import { Users } from "../components/Users/Users";


export const routes = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }, 
    {
        path: "/products",
        element: <Products />
    }, 
    {
        path: "/categories",
        element: <Categories />
    }, 
    {
        path: "/brands",
        element: <Brands />
    }, 
    {
        path: "/users",
        element: <Users />
    }, 
    {
        path: "/orders",
        element: <Orders />
    }, 
    {
        path: "/slides",
        element: <Slides />
    }, 
    {
        path: "/vouchers",
        element: <Vouchers />
    }, 
]