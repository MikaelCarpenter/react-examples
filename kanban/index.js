// Styles
// var styles = {
// 	taskList: {	
// 		width: 220,
// 		float: 'left',
// 		marginRight: 25,
// 		padding: 25,
// 		border: '1px solid #ccc',
// 		borderRadius: 5
// 	}
// }
// add to a component with style={styles.taskList} 

// Components
var Task = React.createClass({
	render: function() {
		return (
			<li className='task'>
				{this.props.text}
				<span className='delete'
					onClick={this.props.deleteTask} />
			</li>
		);
	}
});

var AddTask = React.createClass({
	getInitialState: function() {
		return {text: ''};
	},
	handleChange: function(event) {
		this.setState({text: event.target.value});
	},
	render: function() {
		return (
			<div className='add-task'>
				<input type='text'
					value={this.state.text}
					onChange={this.handleChange} />
				<button type='button' onClick={this.props.addTask.bind(null, this.state.text)}>
					Add
				</button>
			</div>
		);
	}
});

var TaskList = React.createClass({
	getInitialState: function() {
		return {tasks: this.props.tasks};
	},
	deleteTask: function(id) {
		var self = this;
		$.ajax({
			url: '/api/' + this.props.id + '/task/' + id,
			type: 'DELETE',
			success: function(result) {
				var tasks = self.state.tasks;
				tasks.splice(id, 1);
				self.setState({tasks: tasks});
			}
		});
	},
	addTask: function(text) {
		var self = this;
		$.ajax({
			url: '/api/' + this.props.id + '/task',
			type: 'PUT',
			data: {'text' : text},
			success: function(result) {
				self.setState({ tasks: self.state.tasks.concat([{text: text}])});
			}
		});
	},
	render: function() {
		var self = this;
		var task_list = this.state.tasks.map(function(task, index) {
			return (
				<Task key={index}
					text={task.text}
					deleteTask={self.deleteTask.bind(self, index)} />
			);
		});
		return (
			<div className='task-list'>
				<h1 className='list-title'>
					{this.props.name}
				</h1>
				<ul className='list-tasks'>
					{task_list}
				</ul>
				<AddTask addTask={self.addTask} />
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		var lists = this.props.lists.map(function(list, index) {
			return (
				<TaskList key={index}
					id={index}
					name={list.name}
					tasks={list.tasks} />
			);
		});
		return (
			<div className='lists'>
				{lists}
			</div>
		);
	}
});

// getting the state of the board and then rendering our app
$(document).ready(function() {
	$.getJSON('http://localhost:8000/api/board', function(data) {
		React.render(
			<App lists={data.lists} />,
			document.body
		);
	});
});