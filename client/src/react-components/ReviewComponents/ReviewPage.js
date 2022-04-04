import './ReviewPage.css';
import Comments from './Comments/Comment';
import Statistics from './Statistics/Statistics';
import WriteComment from './WriteComment/WriteComment';
import { Navigate, useSearchParams } from 'react-router-dom';
import { uid } from 'react-uid';
import React, {useState, useEffect} from 'react';
import { getReviews, makeReview } from '../../actions/review';

function ReviewPage() {
  const state = {
    comments: [
      {userName: 'user', displayName: 'Fred(User)', profilePicture: null, rate: 5,
       text: 'This is a perfect stock!'},
      {userName: 'admin', displayName: 'John(Admin)', profilePicture: null, rate: 1,
      text: 'I hate this.'}
    ],
    statistics: [{fiveStar: 1, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 1, avg: '3.0', numComment: 2}],
    redirect: null,
    new: {userName: 'user', displayName:'Fred(User)', profilePicture: null, rate: null, text: null}
  };

  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState();

  // useEffect(() => {
  //   setReviews(getReviews(stock))
  // }, [])

  const newComment =  <WriteComment parentCallBack={handleInput} />

  const [params, setParams] = useSearchParams();
  const stock_symbol = params.get('symbol');

  useEffect(() => {
    getReviews(stock_symbol, reviews, setReviews);
  }, [params]);

 
  useEffect(() =>{
    updateStats()
  }, [])

  function handleScroll() {
    window.scrollBy(0,1000)
  }

  function handleInput(text, rate) {
    makeReview(stock_symbol, text, rate, setReviews);

    updateStats();
  }

  function updateStats() {
    setStats(state.statistics.map((stats) =>
    <Statistics key={ uid(stats) } fiveStar={stats.fiveStar} fourStar={stats.fourStar} threeStar={stats.threeStar} 
    twoStar={stats.twoStar} oneStar={stats.oneStar} avg={stats.avg} numComment={stats.numComment} />))
  }

  function renderReviews() {
    return reviews.map(review => <Comments key={ uid(review) } userName={ review.author } displayName={ review.displayName } rate={ review.stars } text={ review.review } />);
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
              {renderReviews()}
            </div>
          </div>
          <div className='allStats'>
            {stats}
          </div>
          <div className='writeComment'>{newComment}</div>
        </div>
      </div>
    )
}

export default ReviewPage;
