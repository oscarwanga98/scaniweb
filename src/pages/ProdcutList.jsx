import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function ProdcutList() {
  const [prodcuts, setProdcuts] = useState([]);
  const deleteList=[]
  const READ_LINK = "http://king1234.onlinewebshop.net/scandiweb4/api.php";
  const DELETE_LINK = "http://king1234.onlinewebshop.net/scandiweb4/api.php";

  useEffect(() => {
    getProdcuts();
  }, []);

  function getProdcuts() {
    axios
      .get(READ_LINK)
      .then((response) => {
        setProdcuts(response.data);
      })
      .catch((error) => {
        console.log(error);
        // handle error here
      });
  }

  function handleProductSelection(product) {
    deleteList.push(product);
  }

  function massDelete() {
    console.log(deleteList)
    axios
      .delete(DELETE_LINK, {data:deleteList})
      .then((response) => {
        console.log(response);
        getProdcuts();
      })
      .catch((error) => {
        console.log(error);
        // handle error here
      });
  }

  const listItems = prodcuts.map((product) => (
    <Card
      key={product.specialId}
      product={product}
      addList={handleProductSelection}
    />
  ));

  return (
    <>
      <div className="header">
        <p>Product List </p>
        <div className="buttonsHolder">
          <Link to="/add-product">
            <button className="btn1" id="ADD" >
              ADD
            </button>
          </Link>
          <button
            className="btn1"
            onClick={massDelete}
           
            
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <div className="line"></div>

      <div className="container">{listItems}</div>
    </>
  );
}

export default ProdcutList;
