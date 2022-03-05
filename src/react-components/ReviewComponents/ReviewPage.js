import './ReviewPage.css';
import Comments from './Comments/Comment';
import Statistics from './Statistics/Statistics';
import WriteComment from './WriteComment/WriteComment';
import picture1 from './Comments/logo.svg';
import picture2 from './Comments/uoft.jpg';
import NavBar from '../navbar/Navbar';
import { render } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, {useState} from 'react';

function ReviewPage() {
  const state = {
    comments: [
      {userName: 'nugget', displayName: 'ILikeNugget', profilePicture: picture1, rate: 5,
       text: 'It\'s not only writers who can benefit from this free online tool. If you\'re a programmer \
       who\'s working on a project where blocks of text are needed, this tool can be a great way to get that.\
        It\'s a good way to test your programming and that the tool being created is working well. Above are \
        a few examples of how the random paragraph generator can be beneficial.'},
      {userName: 'UofT', displayName: 'University of Toronto', profilePicture: picture2, rate: 1,
      text: 'It\'s not only writers who can benefit from this free online tool. If you\'re a programmer \
      who\'s working on a project where blocks of text are needed, this tool can be a great way to get that.\
       It\'s a good way to test your programming and that the tool being created is working well. Above are \
       a few examples of how the random paragraph generator can be beneficial. The best way to see if this\
        random paragraph picker will be useful for your intended purposes is to give it a try. Generate a \
        number of paragraphs to see if they are beneficial to your current project.If you do find this'}
    ],
    reviewHeader: [{text: 'Reviews'}],
    statistics: [{fiveStar: 1, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 1, avg: '3.0', numComment: 2}],
    redirect: null,
    new: {userName: 'newUser', displayName:'IMissRW', profilePicture: picture1, rate: null, text: null}
  };

  const childElement = React.createRef();

  const allComments = state.comments.map((comment) => 
                      <Comments userName={comment.userName} displayName={comment.displayName} profilePicture={comment.profilePicture} rate={comment.rate} text={comment.text}/>)

  const statistics = state.statistics.map((stats) =>
  <Statistics  fiveStar={stats.fiveStar} fourStar={stats.fourStar} threeStar={stats.threeStar} twoStar={stats.twoStar} oneStar={stats.oneStar} avg={stats.avg} numComment={stats.numComment} />)

  const navbar = <NavBar />

  const newComment =  <WriteComment rate={state.new.rate} text={state.new.text}/>

  // const writeComment =  <WriteComment/>

  // popUp = () => {
  //   this.setState({redirect: writeComment})
  // }

  render(); {

    // if(this.state.redirect){
    //   return <Navigate to={this.state.redirect}></Navigate>
    // }
   
  
    return (
      <div>
        {navbar}
        <div className='reviewSta'>
          <div className='allReviews'>
            <div className='reviewHeader'>
                  Review
            </div>
            <button className='writeCommentButton button2' >Write Comment</button>
            <div id='reviewScroller'>
              {allComments}
            </div>
          </div>
          <div className='allStats'>
            {statistics}
          </div>

        </div>
        {/* <div className='writeComment'>{newComment}</div> */}
        
      </div>
    )
  } 
}

export default ReviewPage;
