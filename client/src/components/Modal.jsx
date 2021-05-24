import React,{useState} from 'react'
import axios from 'axios'

const Modal = ({invisible,id,listSetter, msgSetter, item}) => {
    const [formContent, setContent] = useState({
        item:'',
        priority:3,
        id:id
    })

    const handleChange = (e) => {
        console.log(e.target.value, 'value');
        setContent({
            ...formContent,
            item: e.target.value
        })
        console.log(formContent, 'handleChange');
    }
    
    const priorityChange = (e) => {
        console.log(e.target.value, 'priority');
        const number = parseInt(e.target.value)
        console.log(number);
        setContent({
            ...formContent,
            [e.target.name]:number
        })
    }


    const send = (e) => {
        e.preventDefault();
        if(formContent.item !== '' || formContent.priority !== null){
            axios.post('/update', formContent)
            .then((res)=>{
                console.log(res.data, 'UPP');
                msgSetter(res.data.msg)
                axios.get('/add')
                .then((res)=>{
                listSetter(res.data)
                })
            })
        }
        //reset the form   
        setContent({
            item:'',
            priority:3,
        })
        //close-modification-form 
        invisible()
    }

    //close-modification-form 
    const undo = () => {
        invisible()
    }
    
    return (
        <div className="item">
            <form className='modal-form' onSubmit={send}>
                <label htmlFor="item">Item:</label>
                <input type="text" id="item" name="item" onChange={handleChange} value={formContent.item} placeholder={item} maxLength="16"/>
                <div className="range-container">
        
                    <div className="range-modal">
                        <input type="range" id="priority" name="priority" min="1" max="5" step="1" onChange={priorityChange} value={formContent.priority}/>
                    </div>
                    <div className="modal-counter">
                        <p>{formContent.priority}</p>
                    </div>
                </div>
                <div className="modal-button">
                    <button type="button" onClick={undo}className="btn item-btn retino" >Undo</button>
                    <button type="submit" className="btn item-btn retino">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default Modal
