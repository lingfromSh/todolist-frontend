import React from 'react';
import './app.css';
import { request } from '../../utils/request';

export default class ToDoList extends React.Component {
    constructor() {
        super()
        this.state = {
            text: "在这里输入todo",
            todo: [],
            finished: []
        }
    }

    componentDidMount = () => {
        this.loadTodo();
        this.loadFinished();
    }

    clearInput = () => {
        this.setState({
            text: ""
        })
    }

    handleInput = e => {
        let key = e.keyCode;
        if (key == 13) {
            this.add();
        }
    }

    add = () => {
        let newTodo = this.state.todo;
        request("http://localhost:5000/api/wy/add/todo/", "post", this.state.text).then((response) => {
            if (response.data.code == 200) {
                newTodo.push(this.state.text);
                this.setState({
                    todo: newTodo,
                })
            }
        })
    }

    addToTodo = idx => {
        let newTodo = this.state.todo;
        let newFinished = this.state.finished;
        let data = this.state.finished[idx];
        request("http://localhost:5000/api/wy/move/todo/", "post", data).then((response) => {
            if (response.data.code == 200) {
                newTodo.push(data);
                newFinished.splice(idx, 1);
                this.setState({
                    todo: newTodo,
                    finished: newFinished
                })
            }
        })
    }

    addToFinished = idx => {
        let newTodo = this.state.todo;
        let newFinished = this.state.finished;
        let data = this.state.todo[idx];
        request("http://localhost:5000/api/wy/move/completed/", "post", data).then((response) => {
            if (response.data.code == 200) {
                newFinished.push(data);
                newTodo.splice(idx, 1)
                this.setState({
                    todo: newTodo,
                    finished: newFinished,
                })
            }
        })
    }

    removeFromTodo = idx => {
        let newTodo = this.state.todo;
        request("http://localhost:5000/api/wy/delete/todo/", "post", idx).then((response) => {
            if (response.data.code == 200) {
                newTodo.splice(idx, 1);
                this.setState({
                    todo: newTodo,
                });
            }
        })
    }

    removeFromFinished = idx => {
        let newFinished = this.state.finished;
        request("http://localhost:5000/api/wy/delete/completed/", "post", idx).then((response) => {
            if (response.data.code == 200) {
                newFinished.splice(idx, 1);
                this.setState({
                    finished: newFinished,
                });
            }
        })
    }

    loadTodo = () => {
        request("http://localhost:5000/api/wy/load/todo/", "get").then((response) => {
            if (response.data.code == 200) {
                this.setState({
                    todo: response.data.data.todo || []
                });
            }
        })
    }

    loadFinished = () => {
        request("http://localhost:5000/api/wy/load/completed/", "get").then((response) => {
            if (response.data.code == 200) {
                this.setState({
                    finished: response.data.data.completed || []
                });
            }
        })
    }

    render() {
        const { todo, finished } = this.state;
        return (
            <div className="todolist-box" >
                <div className="todolist-container">
                    <div className="todolist-input-box">
                        <span className="input input--isao">
                            <input type="text" id="input-1" className="input__field input__field--isao" value={this.state.text} onFocus={() => this.clearInput()} onChange={e => this.setState({ text: e.target.value })} onKeyDown={e => this.handleInput(e)} />
                            <label className="input__label input__label--isao" htmlFor="input-1"><span className="input__label-content input__label-content--isao">凌凌需要改正的地方</span></label>
                        </span>
                    </div>
                    <div className="todolist-todo-box">
                        <span className="todolist-todo-span bttn-warning">需要“改正” <button onClick={() => this.loadTodo()} className="bttn-material-flat bttn-xs bttn-warning">刷新</button></span>
                        {
                            todo.map((v, i) => (
                                <div key={'todo' + i} className="todolist-todo">
                                    <span className="todolist-todo-span" style={{ fontSize: '.7rem' }}>{v}</span>
                                    <div>
                                        <button type="button" onClick={() => this.addToFinished(i)} className="bttn-material-flat bttn-xs bttn-warning" style={{ marginRight: 5 }}>改了!</button>
                                        <button type="button" onClick={() => this.removeFromTodo(i)} className="bttn-material-flat bttn-xs bttn-danger">没写好!</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="todolist-finished-box">
                        <span className="todolist-todo-span bttn-success">已经“改正” <button onClick={() => this.loadFinished()} className="bttn-material-flat bttn-xs bttn-warning">刷新</button></span>
                        {
                            finished.map((v, i) => (
                                <div key={'finished' + i} className="todolist-todo">
                                    <span className="todolist-todo-span" style={{ fontSize: '.7rem' }}>{v}</span>
                                    <div>
                                        <button type="button" onClick={() => this.addToTodo(i)} className="bttn-material-flat bttn-xs bttn-warning" style={{ marginRight: 5 }}>再犯!</button>
                                        <button type="button" onClick={() => this.removeFromFinished(i)} className="bttn-material-flat bttn-xs bttn-success">既往不咎!</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}