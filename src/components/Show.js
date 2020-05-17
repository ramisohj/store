import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
const storage = firebase.storage();

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
    //showing image:
    // Create a reference to the file we want to download
    var starsRef = storage.ref('images/stars.jpg');

    // Get the download URL
    starsRef.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
    }).catch(function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        // case 'storage/object-not-found':
        //   // File doesn't exist
        //   break;

        // case 'storage/unauthorized':
        //   // User doesn't have permission to access the object
        //   break;

        // case 'storage/canceled':
        //   // User canceled the upload
        //   break;

        // ...

        // case 'storage/unknown':
        //   // Unknown error occurred, inspect the server response
        //   break;
      }
    })

  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Bowwward List</Link></h4>
            <h3 class="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div class="panel-body">
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;