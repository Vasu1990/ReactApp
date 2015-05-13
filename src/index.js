/**
 * Created by vasunagpal on 24-04-2015.
 */

var data = [
    {author: "Pete Hunt1", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
        render: function() {
            return (
                <div className="commentBox">
                <h1>Hello, world! I am a CommentBox.</h1>

                <CommentList data={this.props.data}/>
                <CommentForm />
        </div>
);
}
});


var CommentList = React.createClass({

        render:function(){
            var commentNodes = this.props.data.map(function (comment) {
                return(
                    <Comment author={comment.author}>
            {comment.text}
        </Comment>
);
});

return (
    <div className="CommentList">
Comment List
<br></br>
<h3>Hey I am a comment</h3>
<Comment author="Vasu Nagpal11"></Comment>
<Comment author="Vasu Nagpal2"></Comment>

{commentNodes}
</div>
);
}
});

var CommentForm = React.createClass({
    render:function(){
        return (
            <div className="commentForm">
        Comment Form
        </div>
        );
    }
});

var Comment = React.createClass({
        render:function(){
            return (
                <div className="comment">

            <p>This is a comment from</p>
            <h2 className="commentAuthor">
            {this.props.author}
        </h2>

        </div>
);
}
});

React.render(
<CommentBox data={data}/>,
    document.getElementById('content')
);

var DynamicCommentBox = React.createClass({
    getInitialState: function() {
    return {data1: []};
},
loadCommentsFromServer: function() {
    $.ajax({
        async: false,
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            this.setState({data1: data});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
},
componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
},
handleCommentSubmit: function (comment) {
    //alert(comment);
    var comments = this.state.data1;
    var newComments = comments.concat([comment]);
    this.setState({data1: newComments});

    $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
            this.setState({data1: data});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
},
render: function() {
    return (
        <div className="commentBox">
    <h1>Hello, world! I am a Dynamic CommentBox.</h1>
    <DynamicCommentList dataAsync={this.state.data1} />
<DynamicCommentForm onCommentSubmit ={this.handleCommentSubmit}/>
</div>
);
}
});

var DynamicCommentList = React.createClass({

        render:function(){
            var commentNodes = this.props.dataAsync.map(function (comment) {
                return(
                    <DynamicComment author={comment.author}>
            {comment.text}
        </DynamicComment>
);
});

return (
    <div className="CommentList">
Comment List
<br></br>
<h3>Hey I am a comment</h3>

{commentNodes}
</div>
);
}
});

var DynamicCommentForm = React.createClass({
    handleSubmit: function (e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if(!text || !author)
    {
        return ;
    }
    this.props.onCommentSubmit({author : author , text : text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
},
render:function(){
    return (
        <div className="commentForm">
    Comment Form

    <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
    </form>
</div>
);
}
});

var DynamicComment = React.createClass({
        render:function(){
            return (
                <div className="comment">

            <p>This is a comment from</p>
            <h2 className="commentAuthor">
            {this.props.author}
        </h2>

        </div>
);
}
});



React.render(
<DynamicCommentBox url="data.json" pollInterval={2000} />,
    document.getElementById('content2')
);


