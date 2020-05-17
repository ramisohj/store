import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
const storage = firebase.storage();

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    let boards = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      this.getImage(doc.data().nameImage)
      .then(image => {
        let { title, description, price } = doc.data();
        boards.push({
          key: doc.id,
          doc,
          title,
          description,
          price,
          image
        });
        this.setState({
          boards
        });
      })
    });
  }

  async getImage(image) {
    return new Promise((resolve, reject) => {
      storage
      .ref('images')
      .child(`${image}`)
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      }).catch((error) => {
        console.log('ERROR --> ', image,' -- ', error)
        reject(error);
      })
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.price}</td>
                    <td><img src={board.image} alt={board.title} height='200'/></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;