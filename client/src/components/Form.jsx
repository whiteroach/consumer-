import React,{useState} from 'react'
import axios from 'axios';



const Form = ({listSetter, msgSetter}) => {
    const [formContent, setContent] = useState({
        item:'',
        priority:3,
    })
  
    const handleChange = (e) => {
        setContent({
            ...formContent,
            item: e.target.value
        })

    }
    const priorityChange = (e) => {
        const number = parseInt(e.target.value)
        setContent({
            ...formContent,
            [e.target.name]:number
        })
    }

    const send = (e) => {
        e.preventDefault();
        if(formContent.item !== '' && formContent.priority !== null){
            axios.post('/add', formContent)
            .then((res)=>{
                msgSetter(res.data.msg)
                axios.get('/add')
                .then((res)=>{
                listSetter(res.data)
                })
            })
        } else {msgSetter('both fields are necessary!')}  
        setContent({
            item:'',
            priority:3,
        }) 

    }
    
  
    return (
        <header>
            <div className='form-container'>
                <form className=' flex-column-center' onSubmit={send}>
                    <label htmlFor="item">Item:</label>
                    <input type="text" id="item" name="item" onChange={handleChange} value={formContent.item} placeholder="insert item" maxLength="16"/>
                    <label htmlFor="priority">Priority:</label>
                    <div className="range-container">
                        <div className='range'>
                            <input type="range"  name="priority" min="1" max="5" step="1" onChange={priorityChange} value={formContent.priority}/>
                        </div>
                        <div>
                            <p className='counter-form'>{formContent.priority}</p>
                        </div>
                    </div>
                    <button type="submit" className="btn">Add</button>
                </form> 
            </div>
            <h1>CONSUMER+</h1>

        </header>

    )
}

export default Form
