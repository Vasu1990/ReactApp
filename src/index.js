/**
 * Created by vasunagpal on 24-04-2015.
 */

//temporary data array
var data = [
    {author: "Pete Hunt1", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];
//The Owner component
var CommentBox = React.createClass({

    getInitialState: function() {
        return {stateData: data};
    },
    //handles form submitt
    handleCommentSubmit: function (comment) {

        var comments = this.state.stateData;
        console.log(this.state.stateData);

        var newComments = comments.concat([comment]);
        //this will call re render Component
        this.setState({stateData: newComments});

    },
    //contains Owned Components
    //custom event handler on Form Component to update state
        render: function() {
            return (
                <div>
                <h1>Hello, world! This is a CommentBox Component.</h1>

                <CommentList  data={this.state.stateData}/>
                <CommentForm onCommentSubmit ={this.handleCommentSubmit}/>
        </div>
);
}
});

//Comment List Component
var CommentList = React.createClass({

    //this.sate.data become prop for Owned component
    //key is used to uniquely identify each row by react
        render:function(){
            var commentNodes = this.props.data.map(function (comment,i) {
                return(
                    <Comment key={i} author ={comment.author} text={comment.text}>

        </Comment>
);
});
//Comment i sOwned By Comment List
//Comment passing props to itself
return (
    <div  className="alert alert-info">
        <h2>This is a CommentList Component</h2>
        <br></br>
        <Comment author="Vasu Nagpal11" text="React is fun"></Comment>
        <Comment author="Vasu Nagpal2" text="I like react"></Comment>
            {commentNodes}
    </div>

);
}
});

//Comment Form Component
var CommentForm = React.createClass({

    //handles form submit
    handleSubmit: function (e) {
        e.preventDefault();

        //getting value for form fields using ref
        var author = React.findDOMNode(this.refs.author).value.trim();
        var text = React.findDOMNode(this.refs.text).value.trim();

        if(!text || !author)
        {
            return ;
        }
        //calling event handler to mutate state in parent component since we cannot  not set state in child component
        this.props.onCommentSubmit({author : author , text : text});

        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.text).value = '';
        return;
    },
    render:function(){
        return (
            <div className="alert alert-danger">
        <h4>This is a CommentForm Component</h4>
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Your name" ref="author" />
                    <input type="text" placeholder="Say something..." ref="text" />
                    <input type="submit" value="Post" />
                </form>
        </div>
        );
    }
});

//Comment Component
var Comment = React.createClass({
        render:function(){
            return (
                <div className="alert alert-warning">

                    <h3>This is a Comment Component</h3>
                    <p>{this.props.text}</p>
                    <p className="commentAuthor">
                     -by {this.props.author}</p>

                </div>
);
}
});

//Final rendering of Components inside the DOM
React.render(
<CommentBox data={data}/>,
    document.getElementById('content')
);













//DATA THROUGH XHR CALLS
var DynamicCommentBox = React.createClass({
    getInitialState: function() {
    return {data1: []};
},
loadCommentsFromServer: function() {
    $.ajax({

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
    console.log(this.state.data1);

    var newComments = comments.concat([comment]);
    this.setState({data1: newComments});

},
render: function() {
    return (
        <div className="commentBox">

    <h1>Hello, world! I am a Dynamic CommentBox.</h1>
            <DynamicCommentForm onCommentSubmit ={this.handleCommentSubmit}/>
    <DynamicCommentList dataAsync={this.state.data1} />

</div>
);
}
});

var DynamicCommentList = React.createClass({

        render:function(){
            var commentNodes = this.props.dataAsync.map(function (comment,i) {
                return(
                    <DynamicComment author={comment.author} text={comment.text} key={i}>
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

            <p>This is a comment</p>
            <h2 className="commentAuthor">
            {this.props.author}</h2>
                    <br></br>
            <p>{this.props.text}</p>


        </div>
);
}
});



React.render(
<DynamicCommentBox url="data.json" pollInterval={8000} />,
    document.getElementById('content2')
);
