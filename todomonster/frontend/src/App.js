import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import axios from 'axios'


const DOMAIN = 'http://127.0.0.1:8001/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: 'TODOs', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: []
        }
    }

    getProject(id) {
        // console.log('call')
        // console.log(get_url(`/api/projects/${id}`))
        axios.get(get_url(`projects/${id}`))
            .then(response => {
                console.log(response.data)
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        axios.get(get_url('users/'))
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))


        axios.get(get_url('projects/'))
            .then(response => {
                //console.log(response.data)
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))

        axios.get(get_url('todos/'))
            .then(response => {
                //console.log(response.data)
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <Router>
                <header>
                    <Navbar navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users}/>
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects}/>
                            </Route>
                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos}/>
                            </Route>
                            <Route path="/project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                                                item={this.state.project}/>}/>
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </Router>


        )
    }
}


export default App;