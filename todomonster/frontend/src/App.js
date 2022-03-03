import React from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import axios from 'axios'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'


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
            todos: [],
            auth: {username: '', is_login: false}
        }
    }

    login(username, password) {
        axios.post(get_url('token/'), {username: username, password: password})
            .then(response => {
                const result = response.data
                const access = result.access
                const refresh = result.refresh
                localStorage.setItem('login', username)
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
                this.setState({'auth': {username: username, is_login: true}})
                this.load_data()
                 //    <BrowserRouter>
                 //     <Switch>
                 // <Redirect from='/authors1' to='/'/>
                 //     <Switch>
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль')
            } else {
                console.log(error)
            }
        })
    }


    logout() {
        localStorage.setItem('login', '')
        localStorage.setItem('access', '')
        localStorage.setItem('refresh', '')
        this.setState({'auth': {username: '', is_login: false}})
    }

    load_data() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        axios.get(get_url('users/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({users: response.data})
            }).catch(error =>

            console.log(error)
        )

        axios.get(get_url('projects/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({projects: response.data})
            }).catch(error =>
            console.log(error)
        )

        axios.get(get_url('todos/'), {headers})
            .then(response => {
                //console.log(response.data)
                this.setState({todos: response.data})
            }).catch(error =>
            console.log(error)
        )
    }

    componentDidMount() {

        // Получаем значения из localStorage
        const username = localStorage.getItem('login')
        if ((username != "") & (username != null)) {
            this.setState({'auth': {username: username, is_login: true}}, () => this.load_data())
        }
    }


    render() {
        return (
            <Router>
                <header>
                    <Navbar navbarItems={this.state.navbarItems} auth={this.state.auth} logout={() => this.logout()}/>
                </header>
                <main role="main" class="flex-shrink-0">
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
                            <Route exact path='/login'>
                                <LoginForm login={(username, password) => this.login(username, password)}/>
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

    getProject(id) {

        let headers = {
            'Content-Type': 'application/json'
        }
        console.log(this.state.auth)
        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        axios.get(get_url(`/api/projects/${id}`), {headers})
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }
}


export default App;