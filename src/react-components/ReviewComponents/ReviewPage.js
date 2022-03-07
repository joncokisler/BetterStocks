import './ReviewPage.css';
import Comments from './Comments/Comment';
import Statistics from './Statistics/Statistics';
import WriteComment from './WriteComment/WriteComment';
import picture1 from './Comments/logo.svg';
import picture2 from './Comments/uoft.jpg';
import NavBar from '../navbar/Navbar';
import { render } from '@testing-library/react';
import { Navigate, useSearchParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react';

function ReviewPage() {
  const state = {
    comments: [
      {userName: 'user', displayName: 'user', profilePicture: picture1, rate: 5,
       text: 'This is a perfect stock!'},
      {userName: 'admin', displayName: 'admin', profilePicture: picture2, rate: 1,
      text: 'I hate this.'}
    ],
    reviewHeader: [{text: 'Reviews'}],
    statistics: [{fiveStar: 1, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 1, avg: '3.0', numComment: 2}],
    redirect: null,
    new: {userName: 'newUser', displayName:'IMissRW', profilePicture: picture1, rate: null, text: null}
  };

  const navbar = <NavBar />

  const newComment =  <WriteComment parentCallBack={handleInput} />

  const [params, setParams] = useSearchParams();
  const stock_symbol = params.get('symbol');

  const [userInput, setUserInput] = useState();
  const [stats, setStats] = useState();
 
  useEffect(() =>{
    updateUserInput()
    updateStats()
  }, [])

  function handleScroll() {
    window.scrollBy(0,1000)
  }

  function handleInput(text, rate) {
    const comment = {userName: 'user', displayName: 'User', profilePicture: picture1, rate: rate, text: text}
    state.comments.push(comment)

    // if (rate == 5){
    //   state.statistics[0][0] += 1;
    // }

    updateUserInput()
    updateStats()
  }

  function updateUserInput(){
    setUserInput(state.comments.map((comment) =>   
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
        {navbar}
        <div className='all'>
          <div className='allReviews'>
            <div className='reviewHeader'>
                  Review
            </div>
            <button className='writeCommentButton button2' onClick={handleScroll} >Write Comment</button>
            <div id='reviewScroller'>
              {userInput}
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
