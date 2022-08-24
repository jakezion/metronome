import React, {useState} from 'react';
import {IoSettingsOutline, IoSettingsSharp, IoMusicalNoteSharp, IoMicSharp} from "react-icons/io5";
import {FaDrum, FaGamepad, FaPlug} from "react-icons/fa";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <nav className="settings">
             {/*       <div className="metronome-title">
                        Metronome
                    </div>*/}
                    <ul className="settings-nav">
                        <Dropdown>
                            <DropdownItem icon={<FaGamepad className="icons"/>} title="8-Bit"/>
                            <DropdownItem icon={<FaDrum/>} title="Drum"/>
                            <DropdownItem icon={<FaPlug/>} title="Beep"/>
                        </Dropdown>
                    </ul>
                </nav>
            </>
        )
    }

}

function DropdownItem(props) {
    return (
        <div className="dropdown-item">
            <button className="dropdown-item-button">{props.icon}&nbsp;&nbsp;{props.title}</button>
        </div>
    );
}

function Dropdown(props) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="dropdown-main">
                <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                    {open === false ? <IoSettingsSharp className="settings-button"/> :
                        <IoSettingsOutline className="settings-button"/>}
                </a>
                {open ? <div className="dropdown">Select Sound{props.children}   </div> : <></>}
            </div>
        </>
    );
}

