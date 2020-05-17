import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload'
const storage = firebase.storage();


class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      image: null,
      nameImage: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = e => {
		if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log('IMAGE --> ' + image);
      console.log('IMAGE NAME -->  ' + image.name);
      this.state.image = image;
      this.state.nameImage = image.name;
		}
	};

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, author, image, nameImage } = this.state;
    // Create the file metadata

    this.ref.add({
      title,
      description,
      author,
      nameImage
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        image: null,
        nameImage: ''
      });
      this.props.history.push("/")
    })
    .then( () => {
      //Adding image:
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			error => {
				// Error function ...
				console.log(error);
			},
			() => {
				// complete function ...
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						this.setState({ url });
					});
			}
		);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author, image } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="author">Image:</label>
                <input type="file" class="form-control" name="image" value={image} onChange={this.handleChange} placeholder="Picture" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;