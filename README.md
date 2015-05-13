# ReactApp
+++++++++++
+React App+
+++++++++++ 

What is React?

Why React?
No Rerendring
Virtual DOM
explain  way binding
Unidirection data flow  -- No components change Model
diffing previous and new DOM
create UI as tree of functions and passing data down the tree
views not free in two way binding
processor(more functions take processor) vs RAM(large listeners take RAM)
Reconciliation ?????????????????????needs key
Components?
	main component Controller view manages the state of other components
	createClass - react class with methods
	render
	cannot return sibbling have to return a root node wrap in parent
	even while returning  a component shud return a root node
	<div>

	JSX?
In browser transform on website
turns to function with arguments that looks like arguments
tree of fuunctions and passes them to Virtual DOM
under the hood translation to jss functions
no jQuery react has event system(OnCLick is kind of passing callback to a func)

	{} jsx looks for js variable also can perform maths

Props?
passed down to sub components
this.props consoles to Object

State?
	app state(store) vs componentState(component specific)
	this.setState - change state
	getInitialState - inital component state 

ComponentWillMount
componentDidMount

React.Render

methods
 to perform computations

react Routes
	React diff route renders diff components google react route
	you can have default route
	handler - name of component
	params- this.props.param.id
	 <RouteHandler {..this.props} />



FLUX

component -> Action(type(string),payload(json))  -> dispatcher -> Store ->Emitter ->Component






















