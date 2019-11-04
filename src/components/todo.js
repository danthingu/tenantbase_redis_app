// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import {
    Container,
    Divider,
    Dropdown,
    Icon,
    Header,
    Image,
    List,
    Menu,
    Segment
} from "semantic-ui-react";
let _csrfToken = null;
class ToDoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            todolistFromDB: [],
            todolistFromCache: []
        };
    }
    componentDidMount() {
        this.refreshList();
    }


    refreshList = () => {
        axios
            .get("http://localhost:8000/api/todos/")
            .then(res => {
                console.log(res);
                this.setState({ todolistFromDB: res.data.todolistFromDB, todolistFromCache: res.data.todolistFromCache })
            })
            .catch(err => console.log(err));
    };
    displayCompleted = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    complete
        </span>
                <span
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    Incomplete
        </span>
            </div>
        );
    };
    renderDBItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todolistFromDB;
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2 ${
                        this.state.viewCompleted ? "completed-todo" : ""
                        }`}
                    title={item.description}
                >
                    {item.title}
                </span>
                <span>
                    <button
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        {" "}
                        Edit{" "}
                    </button>
                    <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete{" "}
                    </button>
                </span>
            </li>
        ));
    };
    renderCacheItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todolistFromCache;
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2 ${
                        this.state.viewCompleted ? "completed-todo" : ""
                        }`}
                    title={item.description}
                >
                    {item.title}
                </span>
                <span>
                    <button
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        {" "}
                        Edit{" "}
                    </button>
                    <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete{" "}
                    </button>
                </span>
            </li>
        ));
    };
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/todos/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:8000/api/todos/", item)
            .then(res => this.refreshList());
    };

    handleDelete = async (item) => {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'HTTP_X_CSRFTOKEN';
        axios
            .delete(`http://localhost:8000/api/todos/${item.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                    "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization",
                    'X-CSRFTOKEN': this.getCsrfToken(),
                }
            })
            .then(res => this.refreshList());
    };
    getCsrfToken = () => {
        if (_csrfToken === null) {
            axios.get(`http://localhost:8000/api/tokenAuth/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                    "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization"
                }
            }).then(response => {
                _csrfToken = response.data.csrfToken
            })
                .catch(err => console.log(err));
        }
        return _csrfToken;
    }
    createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-primary">
                                    Add task
                </button>
                            </div>
                            {this.renderTabList()}

                            <Segment>
                                <Header as='h3'>Todo List From SQLite</Header>
                                <ul className="list-group list-group-flush">
                                    {this.renderDBItems()}
                                </ul>
                                <Divider section />

                                <Header as='h3'>Todo List From Redis Cache</Header>
                                <ul className="list-group list-group-flush">
                                    {this.renderCacheItems()}
                                </ul>
                            </Segment>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}
export default ToDoComponent;
