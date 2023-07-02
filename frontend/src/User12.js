import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function User12() {
    const [values, setValues] = useState(
        { date: '', company: '', owner: '', item: '', quantity: '', count: '' }
    )

    const navigate = useNavigate();
    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = new URLSearchParams()
        body.append('id', Math.random() * 1000)
        body.append('date', values.date)
        body.append('company', values.company)
        body.append('owner', values.owner)
        body.append('item', values.item)
        body.append('quantity', values.quantity)
        body.append('count', values.count)

        const response = await fetch('http://localhost:8081/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })

        const data = await response.json()
        if (data.dataCreated) {
            console.log('data created')
        } else {
            console.log('SOME ERROR')
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-2 rounded w-25'>
                <form method='post' onSubmit={handleSubmit}>
                    <div className='mb-1'>
                        <div className='mb-2'>
                            <label htmlFor='date' className='m-3'><strong>Order Date</strong></label>
                            <input type='date' placeholder='Enter date' name='date' value={values.date} onChange={handleInput}
                                className='form-control rounded-0' required />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='company' className='m-3'><strong>Company</strong></label>
                            <input type='text' placeholder='Enter Company aplha-numeric' name='company' value={values.company} onChange={handleInput}
                                className='form-control rounded-0' required pattern='[A-Za-z]' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='owner' className='m-3'><strong>Owner</strong></label>
                            <input type='text' placeholder='Enter Owner aplha-numeric' name='owner' value={values.owner} onChange={handleInput}
                                className='form-control rounded-0' required />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='item' className='m-3'><strong>Item</strong></label>
                            <input type='text' placeholder='Enter Item' name='item' value={values.item} onChange={handleInput}
                                className='form-control rounded-0' required />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='quantity' className='m-3'><strong>Quantity</strong></label>
                            <input type='number' placeholder='Enter Quantity' name='quantity' value={values.quantity} onChange={handleInput}
                                className='form-control rounded-0' required />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='count' className='m-3'><strong>Box count</strong></label>
                            <input type='number' placeholder='Enter Box count' name='count' value={values.count} onChange={handleInput}
                                className='form-control rounded-0' required />
                        </div>
                        <button type='submit' className='btn btn-success w-100 my-1'> <strong>Submit</strong></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default User12
