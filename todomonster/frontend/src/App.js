import React from 'react';
import logo from './logo.svg';

import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import axios from 'axios'


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                // {name: 'Todo', href: '/todo'},
            ],
            users: []
        }
    }

    componentDidMount() {
        axios.get(get_url('users/'))
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <header>
                    <Navbar navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main" class="flex-shrink-0">
                    <div className="container">
                        <UserList users={this.state.users}/>
                    </div>
                </main>
                <Footer/>
            </div>


        )
    }
}


export default App;