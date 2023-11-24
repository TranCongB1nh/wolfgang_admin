import React, { useEffect } from 'react';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import './NavBar.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import VideoStableIcon from '@mui/icons-material/VideoStable';

export const NavBar = ({ isOpenNav, setIsOpenNav }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await sessionStorage.setItem('isAuth', false);
        await sessionStorage.setItem('user', null)
        navigate('/auth');
    }

    return (
        <div className={`navbar ${isOpenNav}`}>
            <NavLink to="/admin" className='logo'>
                <EngineeringRoundedIcon className='icon' />
                <h1>WolfGang<br></br> Behind</h1>
            </NavLink>

            <ul>
                <li className='nav-link'>
                    <NavLink to="/admin/dashboard">
                        <SpaceDashboardRoundedIcon className='icon' />
                        Trang chủ
                    </NavLink>
                </li>
                <div className='line-x'></div>


                <li className='nav-link'>
                    <NavLink to="/admin/slides">
                        <VideoStableIcon className='icon' />
                        Slides
                    </NavLink>
                </li>
                <li className='nav-links'>
                    <NavLink to="/admin/orders">
                        <ShoppingCartRoundedIcon className='icon' />
                        Đơn hàng
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink to="/admin/products">
                        <Inventory2RoundedIcon className='icon' />
                        Sản phẩm
                    </NavLink>
                </li>
                {/* <li className='nav-links'>
                    <span>
                        <ReorderRoundedIcon className='icon2' />
                        Danh mục
                        <ArrowDropDownRoundedIcon className='icon' />
                    </span>
                    <ul className='dropdown'> 
                        <li className='nav-link'>
                            <NavLink to="/admin/categories">
                                <CategoryRoundedIcon className='icon' />
                                Loại sản phẩm
                            </NavLink>
                        </li>
                        <li className='nav-link'>
                            <NavLink to="/admin/brands">
                                <PrecisionManufacturingRoundedIcon className='icon' />
                                Hãng
                            </NavLink>
                        </li>
                        <li className='nav-link'>
                            <NavLink to="/admin/collections">
                                <BallotRoundedIcon className='icon' />
                                Bộ sưu tập
                            </NavLink>
                        </li>
                    </ul>
                </li>
                 */}
                <li className='nav-link'>
                    <NavLink to="/admin/categories">
                        <CategoryRoundedIcon className='icon' />
                        Loại sản phẩm
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink to="/admin/brands">
                        <PrecisionManufacturingRoundedIcon className='icon' />
                        Hãng
                    </NavLink>
                </li>

                <li className='nav-link'>
                    <NavLink to="/admin/users">
                        <SupportAgentRoundedIcon className='icon' />
                        Tài khoản
                    </NavLink>
                </li>
                {/* <li className='nav-links'>
                    <span>
                        <FolderSharedRoundedIcon className='icon2' />
                        Quản lý tài khoản
                        <ArrowDropDownRoundedIcon className='icon' />
                    </span>
                    <ul className='dropdown'>
                        <li className='nav-link'>
                            <NavLink to="/admin/employees">
                                <SupportAgentRoundedIcon className='icon' />
                                Nhân viên
                            </NavLink>
                        </li> 
                    </ul>
                </li> */}


                <li className='nav-link'>
                    <NavLink to="/admin/vouchers">
                        <StyleRoundedIcon className='icon' />
                        Mã giảm giá
                    </NavLink>
                </li>

            </ul>


            <div className='line-x'></div>

            <ul>
                <li className='nav-links'>
                    <span className='logout' onClick={handleLogout}>
                        <MeetingRoomRoundedIcon className='icon2' />
                        Đăng xuất
                    </span>
                </li>
            </ul>
        </div>
    )
}
