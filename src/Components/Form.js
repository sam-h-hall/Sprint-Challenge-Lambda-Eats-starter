import React, { useState } from 'react';
import "./Form.css";
import axios from 'axios';
import * as yup from 'yup';

export default function Form() {
  const [post, setPost] = useState([]);

  const [order, setOrder] = useState({
    name: "",
    size: "",
    pepperoni: false,
    jalapeno: false,
    pineapple: false,
    sausage: false,
    instructions: ""
  });

  const [errors, setErrors] = useState ({
    name: ""
  })

  const submitForm = event => {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/users', order)
      .then(response => {
        setPost(response.data)
        setOrder({
          name: "",
          size: "",
          pepperoni: false,
          jalapeno: false,
          pineapple: false,
          sausage: false,
          instructions: ""
        })
      })
      .catch(error => console.log(error.message))
  }

  const formSchema = yup.object().shape({
    name: yup.string().min(2).required('Must be at least 2 characters'),
    size: yup.mixed(),
    pepperoni: yup.boolean(),
    jalapeno: yup.boolean(),
    pineapple: yup.boolean(),
    sausage: yup.boolean(),
    instructions: yup.string()
  })

  const validateChange = event => {
    yup.reach(formSchema, event.target.name).validate(event.target.value).then(inputIsValid => {
      setErrors({
        ...errors,
        [event.target.name]: ""
      })
    }).catch(error => {
      setErrors({
        ...errors,
        [event.target.name]: error.errors[0]
      })
    })
  }

  const inputChange = event => {
    event.persist();
    console.log(event.target.value)

    const newOrder ={
      ...order,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
    }
    validateChange(event);
    setOrder(newOrder);
  };

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          Name
          <input id="name" name="name" value={order.name} onChange={inputChange} type="text" data-cy="name" />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>

        <label htmlFor="size">
          Pizza Size
          <select id="size" name="size" onChange={inputChange} data-cy="size">
            <option value="" disabled selected hidden>What size would you like?</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        
        <div className="checkboxes">
          <label>How about some toppings?</label>
          <label htmlFor="toppings">
            <input name="pepperoni" type="checkbox" checked={order.pepperoni} onChange={inputChange} />
            Pepperoni
          </label>

          <label htmlFor="toppings">
            <input name="jalapeno" type="checkbox" checked={order.jalapeno} onChange={inputChange} />
            Jalapeno
          </label>

          <label htmlFor="toppings">
            <input name="pineapple" type="checkbox" checked={order.pineapple} onChange={inputChange}/>
            Pineapple
          </label>

          <label htmlFor="toppings">
            <input value={true} name="sausage" type="checkbox" checked={order.sausage} onChange={inputChange} />
            Sausage
          </label>
        </div>

        <label htmlFor="instructions">
          Special Instructions
          <textarea name="instructions" value={order.instructions} onChange={inputChange} type="textbox" data-cy="instructions" />
        </label>

        <button data-cy="submit">Submit Order</button>
      </form>
        <pre>{JSON.stringify(post, null, 2)}</pre>
    </>
  )
}