
import React,{useState} from 'react'
import Modal from './Modal'
import axios from 'axios'
//icons
import Cart from '../images/shopping_cart_black_18dp.svg'
import Delete from '../images/clear_black_18dp.svg'
import Edit from '../images/edit_black_18dp.svg'

const Item = ({index, id, item,priority,deleteItem, listSetter, msgSetter}) => {
    const [visible,setVisible] = useState(true)
    const del = () => {
        deleteItem(id)
    }

    const mod = (e) => {
        setVisible(false)
    }

    const invisible = () => {
        setVisible(true)
    }

    const purchased = (e) => {
        console.log(e.target.id);
        axios.post('/bought',{id:id})
        .then((res)=>{
            msgSetter(res.data.msg)
            axios.get('/add')
            .then((res)=>{
            listSetter(res.data)
            })
        })
    }

    return (
        <div>
            {visible? 
                <div className="item">
                    <div className="delete-box">
                        <button type="button" onClick={del}><img src={Delete} alt="icon-delete"/></button>
                    </div>
                    <div className="item-organizer">
                        <p>Name:</p>
                        <h4>{item}</h4>
                    </div>
                    <div className="item-organizer">
                        <p>Priority:</p>
                        <h4>{priority}</h4>
                    </div>
                    <div className="item-btn-container">
                        <button  type="button" onClick={mod} className="btn item-btn"><img src={Edit} alt="icon-edit"/></button>
                        <button type="button" onClick={purchased}className="btn item-btn"><img src={Cart} alt="icon-cart"/></button>
                    </div>
                </div>
                : <Modal
                    id={id}
                    item={item}
                    invisible={invisible} 
                    msgSetter={msgSetter}                     
                    listSetter={listSetter}
                />
            }
        </div>
    )
}

export default Item
