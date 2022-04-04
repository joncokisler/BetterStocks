import './ReviewPage.css';
import Comments from './Comments/Comment';
import Statistics from './Statistics/Statistics';
import WriteComment from './WriteComment/WriteComment';
import { Navigate, useSearchParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { getReviews } from '../../actions/Review';

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

 
  useEffect(() =>{
    updateReview()
    updateStats()
  }, [])

  function handleScroll() {
    window.scrollBy(0,1000)
  }

  function handleInput(text, rate) {
    const comment = {userName: 'user', displayName: 'Fred(User)', profilePicture: null, rate: rate, text: text}
    state.comments.push(comment)

    // if (rate == 5){
    //   state.statistics[0][0] += 1;
    // }

    updateReview()
    updateStats()
  }

  function updateReview(){
    setReviews(state.comments.map((comment) =>   
    <Comments userName={comment.userName} displayName={comment.displayName} profilePicture={comment.profilePicture}
      rate={comment.rate} text={comment.text}/>))
  }

  function updateStats() {
    setStats(state.statistics.map((stats) =>
    <Statistics  fiveStar={stats.fiveStar} fourStar={stats.fourStar} threeStar={stats.threeStar} 
    twoStar={stats.twoStar} oneStar={stats.oneStar} avg={stats.avg} numComment={stats.numComment} />))
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
              {reviews}
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