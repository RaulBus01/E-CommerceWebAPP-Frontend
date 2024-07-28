import React, { useState } from "react";
import  useUser  from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import './sideMenu.css'

const SideMenu = ({setSelectedMenu}) => {
    const [selected, setSelected] = useState<string>('Personal information');
    const {userId, token} = useAuth();
    const {user, loading} = useUser(userId, token);

    const handleSelectedButton = (buttonName: string) => {
        setSelected(buttonName);
        setSelectedMenu(buttonName);
    }

    return(
        <>
            <div className="main-wrapper">
                <h3>Hello, {user?.first_name} {user?.last_name}</h3>
                <ul>
                    <li>
                        <button className={selected === 'Personal information' ? 'selected' : ''}
                        onClick={() => handleSelectedButton('Personal information')}>
                            Personal information</button>
                    </li>
                    <li>
                        <button className={selected === 'My orders' ? 'selected' : ''}
                        onClick={() => handleSelectedButton('My orders')}>
                            My orders</button>
                    </li>
                    <li>
                        <button className={selected === 'My reviews' ? 'selected' : ''}
                        onClick={() => handleSelectedButton('My reviews')}>
                            My reviews</button>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default SideMenu