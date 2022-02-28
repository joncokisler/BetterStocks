import React from 'react';
import './Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    render() {

        return (
            <div className='reviewHeader'>
                {this.state.text}
                <button className='button button2'>Write Comment</button>
            </div>
        )
    }
}

export default Header;

