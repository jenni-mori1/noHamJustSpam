//render raw HTML from question data 
const RawHTML = props => /*#__PURE__*/React.createElement("span", { dangerouslySetInnerHTML: { __html: props.html } });

class QuestionMedia extends React.Component {
  render() {
    const { img, audio } = this.props;

    if (img) {
      return /*#__PURE__*/React.createElement("img", { className: "img-fluid", src: img.src, alt: img.alt });
    } else if (audio) {
      return /*#__PURE__*/(
        React.createElement("audio", { controls: true }, /*#__PURE__*/
        React.createElement("source", { src: audio.src, type: "audio/mpeg" }), "Your browser does not support the audio element."));



    } else {
      return null; // No media to display
    }
  }}



const QuizProgress = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "progress" }, /*#__PURE__*/
    React.createElement("p", { className: "counter" }, /*#__PURE__*/
    React.createElement("span", null, "Question ", props.currentQuestion + 1, " of ", props.questionLength)), /*#__PURE__*/

    React.createElement("div", { className: "progress-bar", style: { 'width': (props.currentQuestion + 1) / props.questionLength * 100 + '%' } })));


};

const Results = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "results fade-in" }, /*#__PURE__*/
    React.createElement("h1", null, "Your score: ", (props.correct / props.questionLength * 100).toFixed(), "%"), /*#__PURE__*/
    React.createElement("button", { type: "button", onClick: props.startOver }, "Try again ", /*#__PURE__*/React.createElement("i", { className: "fas fa-redo" }))));


};

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getResults = this.getResults.bind(this);
    this.startOver = this.startOver.bind(this);

    this.state = {
      currentQuestion: 0,
      correct: 0,
      inProgress: true,
      questions: [{
        question: "Is this scam or ham?",
        options: [{
          option: "Scam",
          correct: true },
        {
          option: "Ham",
          correct: false }],

        img: {
          src: 'https://iili.io/JEkFDg9.png',
          alt: 'biden' },

        feedback: "There are several red flags indicating that this message is likely a scam. The use of urgency and exclamation marks ('Stand up America!') is a common tactic that scammers use to pressure individuals into taking action without thinking. Additionally, this message is promising a large sum of money from the government without an official announcement, which is to be taken with caution. Finally, the link looks highly suspicious, as an announcement from the government should come from a .gov website.",
        moreUrl: 'https://consumer.ftc.gov/articles/robocalls' },
      {
        question: "Is this spam or ham?",
        options: [{
          option: "Spam",
          correct: false },
        {
          option: "Ham",
          correct: true }],

        img: {
          src: 'https://iili.io/JEkqWJ9.png',
          alt: 'David and Grandma' },

        feedback: "This text message is likely not scam because it's personalized ('Hi, Grandma, it's David').There are no demands for action, suspicious links, or requests for personal information. It's always wise to verify the sender's identity if you're unsure, but this message appears to be a heartfelt check-in rather than a malicious attempt." },
      {
        question: "Is this spam or ham?",
        options: [{
          option: "Spam",
          correct: true },
        {
          option: "Ham",
          correct: false }],

        img: {
          src: 'https://iili.io/JEkBNkX.png',
          alt: 'wells fargo spam' },

        feedback: "This text message is likely scam. It prompts the recipient to call a phone number that doesn't resemble Wells Fargo's official contact information. Also, the request to ignore the message if it's considered valid is also unusual for a legitimate communication from a bank.",
        moreUrl: 'https://www.wellsfargo.com/privacy-security/fraud/report/phish/#:~:text=Be%20suspicious%20of%20messages%20that,urge%20to%20respond%20right%20away' },
      {
        question: "Is this spam or ham?",
        options: [{
          option: "Spam",
          correct: false },
        {
          option: "Ham",
          correct: true }],

        img: {
          src: 'https://iili.io/JEkCxaI.png',
          alt: 'wellsfargo not fraud' },

        feedback: "This one is more ambiguous, but it appears to be legitimate. Compared to the previous Wells Fargo message, this one provides the correct phone number. Additionally, the option to stop receiving messages by replying 'STOP' is a standard feature offered by legitimate messaging services. However, one must still exercise with caution.",
        moreUrl: 'https://www.wellsfargo.com/privacy-security/fraud/report/phish/' },
      {
        question: "Is this spam or ham?",
        options: [{
          option: "Spam",
          correct: true },
        {
          option: "Ham",
          correct: false }],

        img: {
          src: 'https://iili.io/JEko9mF.png',
          alt: 'Stanford' },

        feedback: "This text message is scam. While it claims to be  'Stanford FCU,' it lacks the identification details one would expect from a legitimate message, such as the recipient's name or specific account information. The provided link also looks like a suspicious website that is not associated with Stanford FCU. ",
        moreUrl: 'https://uit.stanford.edu/news/phishing-scams-often-target-stanford-students' },
      {
        question: "Listen to this phone call. Is it scam or ham?",
        options: [{
          option: "Scam",
          correct: true },
        {
          option: "Ham",
          correct: false }],

        audio: {
          src: 'https://od.lk/s/OTFfMjk1NDA0NTBf/joe.mp3',
          alt: 'Joe' },

        feedback: "Government agencies would never ask for date or birth or social security number over an unsolicited call. These requests are often aimed at stealing identity or committing fraud. It's crucial to verify the legitimacy of such requests before disclosing sensitive information.",
        moreUrl: 'https://consumer.ftc.gov/articles/how-avoid-government-impersonation-scam#:~:text=If%20you%20get%20a%20call,a%20scammer%20will%20do%20that.' },
      {
        question: "Listen to this phone call. Is this spam or ham?",
        options: [{
          option: "Scam",
          correct: true },
        {
          option: "Ham",
          correct: false }],

        audio: {
          src: 'https://od.lk/s/OTFfMjk1NDA0NzJf/ElevenLabs_2024-02-18T05_15_42_Patrick_pre_s50_sb75_se56_b_m2.mp3',
          alt: 'Patrick' },

        feedback: "This text message is characteristic of the 'ore ore sagi' scam, a prevalent fraud in Japan where scammers impersonate family members to extort money from the elderly. Several red flags indicate this message is a scam, including the urgent tone and the request for a large sum of money. Additionally, the caller claims that they are unable to collect the money in person, in attempt to prevent the recipient from verifying the situation with other family members or authorities.",

        moreUrl: 'https://japantoday.com/category/features/kuchikomi/%27ore-ore%27-and-related-scams-become-increasingly-elaborate' },

      {
        question: "Listen to this phone call. Is it scam or ham?'",
        options: [{
          option: "Scam",
          correct: false },
        {
          option: "Ham",
          correct: true }],

        audio: {
          src: 'https://od.lk/s/OTFfMjk1NDA0ODdf/ElevenLabs_2024-02-18T05_49_58_Sarah_pre_s50_sb75_se32_b_m2.mp3',
          alt: 'Sarah' },

        feedback: "This phone call is not scam. The tone of the call is friendly and non-threatening. It does not request for personal information or urgent action, rather it serves as a reminder about a community event." }] };


  }

  updateAnswer(e) {
    //record whether the question was answered correctly
    let answerValue = e.target.value;

    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      //convert boolean string to boolean with JSON.parse()
      stateToUpdate[prevState.currentQuestion].answerCorrect = JSON.parse(answerValue);

      return { questions: stateToUpdate };
    });
  }

  checkAnswer(e) {
    //display to the user whether their answer is correct
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      stateToUpdate[prevState.currentQuestion].checked = true;

      return { questions: stateToUpdate };
    });
  }

  nextQuestion(e) {
    //advance to the next question
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.currentQuestion;

      return { currentQuestion: stateToUpdate + 1 };
    }, () => {
      this.radioRef.current.reset();
    });
  }

  getResults() {
    //loop through questions and calculate the number right
    let correct = this.state.correct;

    this.state.questions.forEach((item, index) => {
      if (item.answerCorrect) {
        ++correct;
      }

      if (index === this.state.questions.length - 1) {
        this.setState({
          correct: correct,
          inProgress: false });

      }
    });
  }

  startOver() {
    //reset form and state back to its original value
    this.setState((prevState, props) => {
      let questionsToUpdate = prevState.questions;

      questionsToUpdate.forEach(item => {
        //clear answers from previous state
        delete item.answerCorrect;
        delete item.checked;
      });

      return {
        inProgress: true,
        correct: 0,
        currentQuestion: 0,
        questions: questionsToUpdate };

    });
  }

  componentDidMount() {
    //since we're re-using the same form across questions,
    //create a ref to it so we can clear its state after a question is answered
    this.radioRef = React.createRef();
  }

  render() {
    if (!this.state.inProgress) {
      return /*#__PURE__*/(
        React.createElement("section", { className: "quiz" }, /*#__PURE__*/
        React.createElement(Results, { correct: this.state.correct, questionLength: this.state.questions.length, startOver: this.startOver })));


    }

    return /*#__PURE__*/(
      React.createElement("section", { className: "quiz fade-in", "aria-live": "polite" }, /*#__PURE__*/
      React.createElement(QuizProgress, { currentQuestion: this.state.currentQuestion, questionLength: this.state.questions.length }), /*#__PURE__*/
      React.createElement("div", { className: "question-container" },
      this.state.questions[this.state.currentQuestion].img && /*#__PURE__*/
      React.createElement(QuestionMedia, { key: `img-${this.state.currentQuestion}`, img: this.state.questions[this.state.currentQuestion].img }),

      this.state.questions[this.state.currentQuestion].audio && /*#__PURE__*/
      React.createElement(QuestionMedia, { key: `audio-${this.state.currentQuestion}`, audio: this.state.questions[this.state.currentQuestion].audio }), /*#__PURE__*/


      React.createElement("p", { className: "question" }, /*#__PURE__*/React.createElement(RawHTML, { html: this.state.questions[this.state.currentQuestion].question })), /*#__PURE__*/

      React.createElement("form", { ref: this.radioRef },
      this.state.questions[this.state.currentQuestion].options.map((item, index) => {
        return /*#__PURE__*/React.createElement("div", { key: index,
          className: "option" + (this.state.questions[this.state.currentQuestion].checked && !item.correct ? ' dim' : '') + (this.state.questions[this.state.currentQuestion].checked && item.correct ? ' correct' : '') }, /*#__PURE__*/
        React.createElement("input", { id: "radio-" + index, onClick: this.updateAnswer, type: "radio", name: "option", value: item.correct,
          disabled: this.state.questions[this.state.currentQuestion].checked }), /*#__PURE__*/
        React.createElement("label", { htmlFor: "radio-" + index }, /*#__PURE__*/React.createElement(RawHTML, { html: item.option })));

      })), /*#__PURE__*/


      React.createElement("div", { className: "bottom" },
      this.state.questions[this.state.currentQuestion].feedback && this.state.questions[this.state.currentQuestion].checked && /*#__PURE__*/
      React.createElement("div", { className: "fade-in" }, /*#__PURE__*/
      React.createElement("p", null, /*#__PURE__*/
      React.createElement(RawHTML, { html: this.state.questions[this.state.currentQuestion].feedback }),
      this.state.questions[this.state.currentQuestion].moreUrl && /*#__PURE__*/
      React.createElement(React.Fragment, null, "\xA0", /*#__PURE__*/
      React.createElement("a", { target: "_blank", href: this.state.questions[this.state.currentQuestion].moreUrl }, "Learn more"), "."))),






      !this.state.questions[this.state.currentQuestion].checked && /*#__PURE__*/
      React.createElement("button", { type: "button", onClick: this.checkAnswer,
        disabled: !('answerCorrect' in this.state.questions[this.state.currentQuestion]) }, "Check answer"),


      this.state.currentQuestion + 1 < this.state.questions.length && this.state.questions[this.state.currentQuestion].checked && /*#__PURE__*/
      React.createElement("button", { className: "fade-in next", type: "button", onClick: this.nextQuestion }, "Next ", /*#__PURE__*/React.createElement("i", { className: "fa fa-arrow-right" }))),



      this.state.currentQuestion + 1 === this.state.questions.length && this.state.questions[this.state.currentQuestion].checked && /*#__PURE__*/
      React.createElement("button", { type: "button", className: "get-results pulse", onClick: this.getResults }, "Get Results"))));




  }}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render( /*#__PURE__*/React.createElement(Quiz, null), document.getElementById('smishing'));
});