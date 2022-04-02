import React from "react";

function Pizzainfo({ order }) {
  return (
    <div>
        <h2>
            {order.name}
        </h2>
        <p>{order.size}</p>
        {
            <div>
                <p>toppings</p>
                <ul>
                    {order.toppings.map((name)=> 
                        <li>
                            {name}
                        </li>
                    )

                    }
                </ul>
            </div>
        }
        <p>
            {order.special}
        </p>
    </div>
  );
}

export default Pizzainfo;
