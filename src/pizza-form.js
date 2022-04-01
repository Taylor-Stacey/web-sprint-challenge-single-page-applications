import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./App.css"
import schema from "./formSchema.js/pizzaFormSchema";
import * as yup from "yup";

const initialFormValues = {
    name: '',
    size: '',
    topping1: false,
    topping2: false,
    topping3: false,
    topping4: false,
    special: '',
  }
  
  const initialFormErrors = {
    name: '',
    size: '',
  }
  
  const initialOrders = []
  const initialDisabled = true

export default function PizzaForm(props) {
    const { values, update, submit, change} = props
    const history = useHistory()
    const [order, setOrder] = useState(initialOrders)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)


    const SubmitHandler = (evt) => {
        evt.preventDefault()
        history.push("/Orders")
    }

    const onChange = evt => {
        const { name, value, checked, type} = evt.target
        const valueToUse = type ==="checkbox" ? checked : value
        change(name, valueToUse)
    }

    const validate = (name, value) => {
        yup.reach(schema, name)
          .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: "" }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
      }

    const inputChange = (name, value) => {
        validate(value)
        setFormValues({
            ...formValues,
            [name]: value
        })
    }


    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])
 
    return(
        <section>
            <h2>Pizza Order</h2>
                <form  onSubmit={SubmitHandler} id="pizza-form">
                    
                    <label>
                        Name:
                        <input type="text" name="name" id="name-input"/>
                    </label>
                    <label>
                        Special Instructions:
                        <input type="text" name="SpecialInstructions" id="special-text"/>
                    </label>
                    <label>Pizza Size
                        <select  name="pizza-size" id="size-dropdown" onChange={onChange}>
                            <option value="">--select a size</option>
                            <option value="">--14inch</option>
                            <option value="">--16inch</option>
                            <option value="">--18inch</option>
                        </select>

                    </label>
                    <label>Pizza topping 1
                        <input
                            type="checkbox"
                            name="topping1"
                            onChange={onChange}
                            
                        />
                    </label>
                    <label>Pizza topping 2
                        <input
                            type="checkbox"
                            name="topping2"
                            onChange={onChange}
                            
                        />
                    </label>
                    <label>Pizza topping 3
                        <input
                            type="checkbox"
                            name="topping3"
                            onChange={onChange}
                            
                        />
                    </label>
                    <label>Pizza topping 4
                        <input
                            type="checkbox"
                            name="topping4"
                            onChange={onChange}
                            
                        />
                    </label>
                    <button type="submit">Buy Now!</button>
                </form>
        </section>
    )
}


