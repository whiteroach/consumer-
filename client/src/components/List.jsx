import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Form from './Form'
import Item from './Item'


const List = () => {
    const [list, setList] = useState([]);
    //message-center
    const [msgCenter, setMsgCenter] = useState('')
    //print the content of database
    useEffect(()=>{
        axios.get('/add')
        .then((res)=>{
            setList(res.data)

        })
    },[])
    //messages fade-out
    const fade = () => {
        setMsgCenter('')
    }
    useEffect(()=>{
     setTimeout(fade,3000)
    
    },[msgCenter])



    const deleteItem = (id) => {
        axios.delete('/delete/' + id)
        .then(res => {
            setMsgCenter(res.data.msg)
            axios.get('/add')
            .then((res)=>{
                setList(res.data)
            })
        })
        .catch(err=>{console.log(err)})
    }
    //get the database content from components
    const listSetter = (data) => {
        setList(data)
    }
    //get messages from components
    const msgSetter = (msg) => {
        setMsgCenter(msg)
    }
    return (
        <div>
            <Form
             listSetter={listSetter}
             msgSetter={msgSetter}
            />
            <div className="message-container flex-column-center">
                <div>
                    <div className="message-center">
                        {msgCenter === ''?<p>no message<span id="dot">.</span></p>:<p>{msgCenter}</p>}
                    </div>    
                </div>
            </div>
            <div className="list-container">
            <h3>SHOPPING LIST:</h3>
            {list.map((item, index)=>{
                return(
    
                    <Item
                    key={index}
                    id={item._id}
                    item={item.item}
                    priority={item.priority}
                    deleteItem={deleteItem}
                    listSetter={listSetter}
                    msgSetter={msgSetter}
                    />

                )
            })}
            </div>
        </div>
    )
}

export default List
