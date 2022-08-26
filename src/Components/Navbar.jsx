import React, {useState} from 'react';
import {IoSettingsOutline, IoSettingsSharp} from "react-icons/io5";
import {FaDrum, FaGamepad, FaPlug} from "react-icons/fa";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <nav className="settings">
                    <ul className="settings-nav">
                        <Dropdown>
                            <DropdownItem icon={<FaPlug className="icons button-icon "/>}
                                          onClick={this.props.onClick}
                                          title="Beep"
                                          name="beep"
                                          active={this.props.audioType === 1 ? "dropdown-active-button" : ""}
                            />
                            <DropdownItem icon={<FaGamepad className="icons button-icon"/>}
                                          onClick={this.props.onClick}
                                          title="8-Bit"
                                          name="bit"
                                          active={this.props.audioType === 2 ? "dropdown-active-button" : ""}
                            />
                            <DropdownItem icon={<FaDrum className="icons button-icon"/>}
                                          onClick={this.props.onClick}
                                          title="Drum"
                                          name="drum"
                                          active={this.props.audioType === 3 ? "dropdown-active-button" : ""}
                            />

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
            <button className={`dropdown-item-button ${props.active}`} name={props.name}
                    onClick={props.onClick}>{props.icon}&nbsp;&nbsp;{props.title}</button>
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

