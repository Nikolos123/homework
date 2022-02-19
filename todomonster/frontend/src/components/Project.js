import React from 'react'
import {
  Link,
  useParams
} from "react-router-dom";


const ProjectListItem = ({item}) => {
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.repository}</td>
            <td><Link to={link_to}>Detail</Link></td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    //console.log(users)
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectListItem item={item} />)}
        </table>
    )
}

const ProjectUserItem = ({item}) => {
    return (
        <li>
        {item.username} ({item.email})
    </li>
    )
}

const ProjectDetail = ({getProject, item}) => {
    let { id } = useParams();
    getProject(id)
    let users = item.users ? item.users : []
    console.log(id)
    return (
        <div>
            <h1>{item.name}</h1>
            Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
            {users.map((user) => <ProjectUserItem item={user} />)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}