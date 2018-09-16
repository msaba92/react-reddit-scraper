import React, { Component } from 'react';
import axios from 'axios';

class Fetcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            choice: "",
            success: false,
            failure: ""
        }
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            axios.get(`https://www.reddit.com/r/${this.state.input}.json`)
                .then(res => {
                    let posts = res.data.data.children.map(obj => obj.data);
                    this.setState({
                        posts,
                        success: true,
                        choice: this.state.input
                    })
                })
                .catch((error) => {
                    if (error.response) {
                        this.setState({
                            success: false,
                            failure: "That subreddit does not exist!"
                        })
                    } else {
                        this.setState({
                            success: false,
                            failure: error.message
                        })
                    }
                })
        }
    }

    updateValue = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    renderResults = () => {
        if (this.state.success) {
            return (
                <table id="results">
                    <tbody>
                        <tr>
                            <th>Post</th>
                            <th>Header (External link)</th>
                            <th>Comments</th>
                        </tr>
                        {this.state.posts.map(post =>
                            <tr key={post.id}>
                                <td>
                                    <a href={`https://www.reddit.com/r/${this.state.choice}/comments/${post.id}`}>{post.id}</a>
                                </td>
                                <td>
                                    <a href={post.url}>{post.title}</a>
                                </td>
                                <td className="comments">{post.num_comments}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        } else if (this.state.failure) {
            return <p>{this.state.failure}</p>
        } else {
            return <p>{this.state.failure}</p>
        }
    }


    render() {
        return (
            <div id="mainbody">
                <input id="choice" placeholder="Insert subreddit" value={this.state.input}
                    onChange={(e) => this.updateValue(e)}
                    onKeyPress={(e) => this.handleKeyPress(e)}>
                </input>
                {this.renderResults()}
            </div>
        );
    }
}

export default Fetcher;
