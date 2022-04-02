import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./App.css";
import formSchema from "./formSchema.js/pizzaFormSchema";
import * as yup from "yup";
import Pizzainfo from "./Pizzainfo";

const initialFormValues = {
  name: "",
  size: "",
  toppings: {
    topping1: false,
    topping2: false,
    topping3: false,
    topping4: false,
  },
  special: "",
};

const initialOrders = [];

export default function PizzaForm() {
  const history = useHistory();
  const [order, setOrder] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  const [formErrors, setFormErrors] = useState({
    name: "",
    size: "",
  });
  //come back here to finish this!!!
  const SubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      toppings: Object.keys(formValues.toppings).filter(
        (topping) => formValues.toppings[topping] === true
      ),
      special: formValues.special.trim(),
    };
    axios
      .post("https://reqres.in/api/orders", formData)
      .then((res) => {
        setOrder([res.data, ...order]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    validateChange(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onCheckboxChange = (evt) => {
    const { name, checked } = evt.target;
    validateChange(name, checked);
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: checked,
      },
    });
  };

  const validateChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [name]: error.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
    console.log(formValues.size)
  }, [formValues]);

  return (
    <section>
      <h2>Pizza Order</h2>

      <form onSubmit={SubmitHandler} id="pizza-form">
        <label>
          <p>
            Name: <span className="error"> {formErrors.name}</span>
          </p>
          <input type="text" name="name" id="name-input" value={formValues.name} onChange={onChange} />
        </label>
        <label>
          Special Instructions:
          <input type="text" name="special" id="special-text" value={formValues.special} onChange={onChange}/>
        </label>
        <label>
          Pizza Size
          <select name="size" id="size-dropdown" value={formValues.size} onChange={onChange}>
            <option value="">--select a size</option>
            <option value="14">--14inch</option>
            <option value="16">--16inch</option>
            <option value="18">--18inch</option>
          </select>
        </label>

        <div className="toppings">
          <label>
            Pizza topping 1
            <input
              type="checkbox"
              name="topping1"
              checked={formValues.toppings.topping1}
              onChange={onCheckboxChange}
            />
          </label>
          <label>
            Pizza topping 2
            <input
              type="checkbox"
              name="topping2"
              checked={formValues.toppings.topping2}
              onChange={onCheckboxChange}
            />
          </label>
          <label>
            Pizza topping 3
            <input
              type="checkbox"
              name="topping3"
              checked={formValues.toppings.topping3}
              onChange={onCheckboxChange}
            />
          </label>
          <label>
            Pizza topping 4
            <input
              type="checkbox"
              name="topping4"
              checked={formValues.toppings.topping4}
              onChange={onCheckboxChange}
            />
          </label>
        </div>
        <button type="submit" id="order-button" disabled={disabled}>
          Buy Now!
        </button>
      </form>
      {order.map((order) => {
        return <Pizzainfo order={order} />;
      })}
    </section>
  );
}
