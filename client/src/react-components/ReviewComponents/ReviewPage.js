import './ReviewPage.css';
import Comments from './Comments/Comment';
import Statistics from './Statistics/Statistics';
import WriteComment from './WriteComment/WriteComment';
import { Navigate, useSearchParams } from 'react-router-dom';
import { uid } from 'react-uid';
import React, {useState, useEffect} from 'react';
import { getReviews, makeReview } from '../../actions/review';

function ReviewPage() {

  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState();

  const newComment =  <WriteComment parentCallBack={handleInput} />

  const [params, setParams] = useSearchParams();
  const stock_symbol = params.get('symbol');

  useEffect(() => {
    getReviews(stock_symbol, setReviews);
  }, [params]);

  function handleScroll() {
    window.scrollBy(0,1000)
  }

  function handleInput(text, rate) {
    makeReview(stock_symbol, text, rate, setReviews);
  }

  function renderReviews() {
    return reviews.map(review => <Comments key={ uid(review) } userName={ review.author } displayName={ review.displayName } rate={ review.stars } text={ review.review } />);
  }

  function renderStats() {
    const starCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    reviews.map(review => {
      starCounts[review.stars]++;
    });
    let avg = Object.entries(starCounts).reduce((acc, entry) => acc + (entry[0] * entry[1]), 0) * 1.0 / reviews.length;
    if (reviews.length === 0) {
      avg = 0;
    }

    return <Statistics key={ uid(starCounts) } fiveStar={ starCounts[5] } fourStar={ starCounts[4] } threeStar={ starCounts[3] } twoStar={ starCounts[2] } oneStar={ starCounts[1] } avg={ avg } numComment={ reviews.length } />
  }

    return (
      <div>
        <div className='all'>
          <div className='allReviews'>
            <div className='reviewHeader'>
                  Review
            </div>
            <button className='writeCommentButton button2' onClick={handleScroll} >Write Comment</button>
            <div id='reviewScroller'>
              { renderReviews() }
            </div>
          </div>
          <div className='allStats'>
            { renderStats() }
          </div>
          <div className='writeComment'>{newComment}</div>
        </div>
      </div>
    )
}

export default ReviewPage;
