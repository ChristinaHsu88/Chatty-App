import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001/");
    //window.mysocket = this.socket;
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      textcolor: {}, //orange, blue, purple, red
      messages: [
          // {
          //   username: "Bob",
          //   content: "Has anyone seen my marbles?",
          //   id: 'a'
          // },
          // {
          //   username: "Anonymous",
          //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          //   id: 'b'
          // }
        ]
      };
      this.onNewMessage = this.onNewMessage.bind(this);
      this.changeDefaultUser = this.changeDefaultUser.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
  }

 

  changeDefaultUser(username) {
    if (username !== this.state.currentUser.name) {
      const notification = {type: "postNotification", content: this.state.currentUser.name + " has changed their name to " + username}
      let newNotify = JSON.stringify(notification);
      this.socket.send(newNotify);
      this.setState({currentUser: {name: username}});
    }
  }


  //adding type to the message
  onNewMessage(username, content) {
    if (username && content) { 
      //console.log(username, content);
      const newMessage = {username: username, content: content, type: "postMessage"};
      let newMsg = JSON.stringify(newMessage);
      this.socket.send(newMsg);
    }
  }

  //deinfed function that set it to children this.props.
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    // let online = 0;
    this.socket.onopen = () => {
      console.log('connected to server');
    }

    this.socket.onmessage = (message) => {
      let userOnline = JSON.parse(message.data);
  
      //console.log(userOnline.num);
      if (userOnline.type === "onlineNums") {
        console.log('checkout the content', userOnline.color);
        this.setState({currentUserNum: userOnline.num});
        this.setState({textcolor: userOnline.color});
        console.log('should have color and user numbers', this.state);
      }
      
      if (userOnline.type === "incomingMessage") {
        this.setState({messages: [...this.state.messages, userOnline]})
        //console.log('new message', this.state);
      }

      if (userOnline.type === "incomingNotification") {
        this.setState({messages: [...this.state.messages, userOnline]})
        //console.log('new notification', this.state);
      }

      if (userOnline.type === "closing windows") {
        this.setState({currentUserNum: userOnline.num });
        //console.log('numbers of users online', this.state);
      }
    }
  }



  render() {
      const currentUser = this.state.currentUser.name;
      let messages = this.state.messages;
      let user = this.state.currentUser.name;
      let number = this.state.currentUserNum;
      let color = this.state.textcolor;
 
      // console.log(this.state);
      //console.log(color);
      // console.log(this.state);
      // console.log('showing the rendering numbers', number);
      //console.log(number);
      
      //console.log(this.messages.num);
      

      //let num = this.state.currentUserNum;
      //console.log(this.props.currentUserNum);
      // let currentUserNum = this.state.currentUserNum.num; //online number
      // console.log(currentUserNum);
      // console.log('this is the state', this.state);
      // console.log('this is the first object', this.state.currentUserNum); //showing the object
      
      // console.log('this is the number', this.state.currentUserNum.num); //error. where to access this
      return (
        <div>
          <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="userCount">{number} user(s) online</span>
          </nav>
          <MessageList messages={messages} user={user} color={color}/>
          <ChatBar currentUser={currentUser}  onNewMessage={this.onNewMessage} changeDefaultUser={this.changeDefaultUser}/>
        </div>
    );
  }
}
export default App;
