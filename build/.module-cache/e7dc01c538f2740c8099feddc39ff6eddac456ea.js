/**
 * Created by vasunagpal on 24-04-2015.
 */

var data = [
    {author: "Pete Hunt1", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({displayName: "CommentBox",
    handleCommentSubmit: function (comment) {
        //alert(comment);
        var comments = this.state.data1;
        console.log(this.state.data1);

        var newComments = comments.concat([comment]);
        this.setState({data1: newComments});

    },
        render: function() {
            return (
                React.createElement("div", null, 
                React.createElement("h1", null, "Hello, world! This is a CommentBox Component."), 

                React.createElement(CommentList, {data: this.props.data}), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
        )
);
}
});


var CommentList = React.createClass({displayName: "CommentList",

        render:function(){
            var commentNodes = this.props.data.map(function (comment,i) {
                return(
                    React.createElement(Comment, {key: i, author: comment.author, text: comment.text}

        )
);
});

return (
    React.createElement("div", {className: "alert alert-info"}, 
        React.createElement("h2", null, "This is a CommentList Component"), 
        React.createElement("br", null), 
        React.createElement(Comment, {author: "Vasu Nagpal11"}), 
        React.createElement(Comment, {author: "Vasu Nagpal2"}), 
            commentNodes
    )

);
}
});

var CommentForm = React.createClass({displayName: "CommentForm",
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
            React.createElement("div", {className: "alert alert-danger"}, 
        React.createElement("h4", null, "This is a CommentForm Component"), 
                React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                    React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
                    React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
                    React.createElement("input", {type: "submit", value: "Post"})
                )
        )
        );
    }
});

var Comment = React.createClass({displayName: "Comment",
        render:function(){
            return (
                React.createElement("div", {className: "alert alert-warning"}, 

                    React.createElement("h3", null, "This is a Comment Component"), 
                    React.createElement("p", {className: "commentAuthor"}, 
                    this.props.author), 
                    React.createElement("p", null, this.props.text)
                )
);
}
});

React.render(
React.createElement(CommentBox, {data: data}),
    document.getElementById('content')
);

var DynamicCommentBox = React.createClass({displayName: "DynamicCommentBox",
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
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
},
handleCommentSubmit: function (comment) {
    //alert(comment);
    var comments = this.state.data1;
    console.log(this.state.data1);

    var newComments = comments.concat([comment]);
    this.setState({data1: newComments});

    //$.ajax({
    //    url: this.props.url,
    //    dataType: 'json',
    //    type: 'POST',
    //    data: comment,
    //    success: function(data) {
    //        this.setState({data1: data});
    //    }.bind(this),
    //    error: function(xhr, status, err) {
    //        console.error(this.props.url, status, err.toString());
    //    }.bind(this)
    //});
},
render: function() {
    return (
        React.createElement("div", {className: "commentBox"}, 

    React.createElement("h1", null, "Hello, world! I am a Dynamic CommentBox."), 
            React.createElement(DynamicCommentForm, {onCommentSubmit: this.handleCommentSubmit}), 
    React.createElement(DynamicCommentList, {dataAsync: this.state.data1})

)
);
}
});

var DynamicCommentList = React.createClass({displayName: "DynamicCommentList",

        render:function(){
            var commentNodes = this.props.dataAsync.map(function (comment,i) {
                return(
                    React.createElement(DynamicComment, {author: comment.author, text: comment.text, key: i}
        )
);
});

return (
    React.createElement("div", {className: "CommentList"}, 
"Comment List", 
React.createElement("br", null), 
React.createElement("h3", null, "Hey I am a comment"), 

commentNodes
)
);
}
});

var DynamicCommentForm = React.createClass({displayName: "DynamicCommentForm",
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
        React.createElement("div", {className: "commentForm"}, 
    "Comment Form", 

    React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {type: "submit", value: "Post"})
    )
)
);
}
});

var DynamicComment = React.createClass({displayName: "DynamicComment",
        render:function(){
            return (
                React.createElement("div", {className: "comment"}, 

            React.createElement("p", null, "This is a comment"), 
            React.createElement("h2", {className: "commentAuthor"}, 
            this.props.author), 
                    React.createElement("br", null), 
            React.createElement("p", null, this.props.text)


        )
);
}
});



React.render(
React.createElement(DynamicCommentBox, {url: "data.json", pollInterval: 2000}),
    document.getElementById('content2')
);


