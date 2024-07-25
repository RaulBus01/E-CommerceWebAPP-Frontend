import React, { useState } from "react";
import './sideMenu.css'

const SideMenu = ({setSelectedMenu}) => {
    const [selected, setSelected] = useState<string>('Personal information');

    const handleSelectedButton = (buttonName: string) => {
        setSelected(buttonName);
        setSelectedMenu(buttonName);
    }

    return(
        <>
            <div className="main-wrapper">
                <h3>Vlad Cirlugea</h3>
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