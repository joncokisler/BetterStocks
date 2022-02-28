import './App.css';
import Comments from './react-components/ReviewComponents/Comments/Comment'
import Header from './react-components/ReviewComponents/Header/Header'
import Statistics from './react-components/ReviewComponents/Statistics/Statistics';
import picture1 from './logo.svg'
import picture2 from './uoft.jpg'

function App() {
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
        number of paragraphs to see if they are beneficial to your current project.If you do find this\
         paragraph tool useful, please do us a favor and let us know how you\'re using it. It\'s greatly \
         beneficial for us to know the different ways this tool is being used so we can improve it with \
         updates. This is especially true since there are times when the generators we create get used in\
         completely unanticipated ways from when we initially created them. If you have the time, please\
          send us a quick note on what you\'d like to see changed or added to make it better in the future.'}
    ],
    reviewHeader: [{text: 'Reviews'}],
    statistics: [{fiveStar: 1, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 1, avg: '3.0', numComment: 2}]
  }

  const allComments = state.comments.map((comment) => 
                      <Comments userName={comment.userName} displayName={comment.displayName} profilePicture={comment.profilePicture} rate={comment.rate} text={comment.text}/>)

  const reviewHeader = state.reviewHeader.map((header) => <Header text={header.text}/>)

  const statistics = state.statistics.map((stats) =>
  <Statistics fiveStar={stats.fiveStar} fourStar={stats.fourStar} threeStar={stats.threeStar} twoStar={stats.twoStar} oneStar={stats.oneStar} avg={stats.avg} numComment={stats.numComment} />)

  return (
    <div className='APPs'>
      {reviewHeader}
      <div className='scroller'>
        {allComments}
      </div>
      {statistics}
    </div>
  );
}

export default App;
