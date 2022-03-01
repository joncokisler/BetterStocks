import React from 'react';

import { AiFillStar } from 'react-icons/ai';

import './styles.css';

class FiveStar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stars: props.stars
        };
    }

    render() {
        const { stars } = this.props;

        const star_fills = [];
        for (let i = 0; i < 5; i++) {
            const stars_rounded = Math.round(parseFloat(stars) * 10.0) / 10;
            if (stars_rounded - i < 1) {
                star_fills.push(Math.round(Math.max(0, (stars_rounded - i)) * 100));
            } else {
                star_fills.push(100);
            }
        }

        return (
            <div>
                <AiFillStar className={`star--percent${star_fills[0]}`} />
                <AiFillStar className={`star--percent${star_fills[1]}`} />
                <AiFillStar className={`star--percent${star_fills[2]}`} />
                <AiFillStar className={`star--percent${star_fills[3]}`} />
                <AiFillStar className={`star--percent${star_fills[4]}`} />
            </div>
        )
    }
}

export default FiveStar;
