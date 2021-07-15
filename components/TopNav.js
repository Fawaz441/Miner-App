import React, { useState } from "react";
import Hamburger from '../components/Hamburger';
import { NavText, TopNav } from "../styles/MainStyles";
import SideNav from "./SideNav";
import { Pressable } from "react-native";
import { withNavigation } from "react-navigation";
import {useDispatch,useSelector} from 'react-redux'

function Nav({ page,navigation,hideHam }) {
    const navOpen = useSelector((state) => state.NavOpen)
    const dispatch = useDispatch()
    const routeName = navigation.state.routeName
    const close = () => dispatch({type:'CLOSE'})
    const open = () => dispatch({type:'OPEN'})

    return (
        <>
            <TopNav>
                <NavText text={routeName} />
                {(!navOpen && !hideHam) && 
                    <Pressable onPress={open}>
                        <Hamburger />
                    </Pressable>
                }
            </TopNav>
            {navOpen && <SideNav closeAction={close}/>}
        </>
    )
}

export default withNavigation(Nav)