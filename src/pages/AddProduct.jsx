import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
    const navigate=useNavigate();

    const newId=uuidv4()

    const [formData,setFormData]=useState({
            "specialId":`${newId}`,
            "skuId":"",
            "name":"",
            "price":"",
            "productType":"",
            "productTypeId":"",
            "weight":"",
            "length":"",
            "width":"",
            "height":""
    });

    const CREATE_LINK='http://king1234.onlinewebshop.net/scandiweb4/api.php'
    const READ_LINK='http://king1234.onlinewebshop.net/scandiweb4/api.php'
    
    const [prodcuts,setProdcuts]=useState([])
    let sku = prodcuts.find((product) => product.skuId === formData.skuId)
    useEffect(() => {
        getProdcuts();
      }, []);
    const handleChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }


    const handleSelection=(event)=>{
        const value=event.target.value;
        const book=document.getElementById('book')
        const dvd=document.getElementById('dvd')
        const furniture=document.getElementById('furniture')
        // const SIZE=document.getElementById('size')
        // const WEIGHT=document.getElementById('weight')
        // const LEGNTH=document.getElementById('length')
        // const WIDTH=document.getElementById('width')
        // const HEIGHT=document.getElementById('height')
        
        // eslint-disable-next-line
        if (value==101){
            
            furniture.style.display='none';
            book.style.display='none';
            dvd.style.display='block';
            // SIZE.required='true'
           
            
        // eslint-disable-next-line    
        } else if(value==102){
            book.style.display='none';
            dvd.style.display='none';
            furniture.style.display='block';
            // LEGNTH.required='true'
            // WIDTH.required='true'
            // HEIGHT.required='true'
        }else if(value==103){
            book.style.display='block';
            dvd.style.display='none';
            furniture.style.display='none';
            // WEIGHT.required='true'
        }
    }
    async function onSubmit(e){
        e.preventDefault();

        let isValid = true;
        // console.log(formData.productTypeId)

        switch(formData.productTypeId) {
            case '101':
                if (!formData.size ||!formData.name ||!formData.skuId||!formData.price) {
                    isValid = false;
                }
                break;
            case '102':
                if (!formData.length || !formData.width || !formData.height ||!formData.name ||!formData.skuId||!formData.price) {
                    isValid = false;
                }
                break;
            case '103':
                if (!formData.weight ||!formData.name ||!formData.skuId||!formData.price) {
                    isValid = false;
                }
                break;
            default:
                isValid = false; ;
        }
        //console.table(formData) 
       //console.log(formData.name)
       //console.log(onSubmit) 
        //console.log(isValid)

        if (isValid==false) {
            alert('Please, submit required data');
            return;
        }

        if (sku) {
                alert('Sku already exists pick another' )
        }else{
            fetch(CREATE_LINK,{
                method:'POST',
                body:JSON.stringify( formData ),
                headers: {'Content-Type': 'application/json'}
            })
            .then((response)=>{
              //  console.log(response)
            })
            navigate('/')
            getProdcuts()
        }
    }
    
    function getProdcuts() {
        fetch(READ_LINK)
            .then(response => response.json())
            .then(data => {
               // console.log(data)
                setProdcuts(data)
            })
            .catch(error => {
                console.log(error)
            });
    }
    ; 
   


  return (
  <>
    

    
    <div >
        
        <form onSubmit={onSubmit} id='product_form'>
            <div className='header'>
            <p>Product Add </p>
            <div className='buttonsHolder'>
                <button className='btn1' type='submit'>Save </button>
            <Link to='/'><button className='btn1'>Cancel</button></Link> 
            </div>            
            </div>

            <div className="line"></div>

            <div className="inputHolder">
                <label >SKU: </label>
                <input id='sku' type="text" name='skuId' value={formData.skuId} onChange={handleChange}  />
            </div>

            <div className="inputHolder">
                <label >Name: </label>
                <input id='name' name='name' type="text" value={formData.name} onChange={handleChange} />
            </div>
            <div className="inputHolder">
                <label >price: </label>
                <input  id='price' type="number" name='price' value={formData.price} onChange={handleChange} />
            </div>
            <div className="inputHolder">
                <label >Type Switcher : </label>
                <select id='productType' name="productTypeId" onClick={handleSelection} onChange={handleChange} >
                    <option value=""></option>
                    <option value="101" text="DVD">DVD</option>
                    <option value="102" text="Furniture">Furniture</option>
                    <option value="103" text="Book">Book</option>
                </select>
            </div>

             <div>
                {/* DVD item details */}
                <div id='dvd' style={{display:'none'}}>
                    <div>
                        <label>
                        Size in MB:
                        <input  id='size' type="number" name="size" onChange={handleChange} />
                        <p>Please, provide size</p>
                        </label>
                    </div>
                </div> 
                {/* Funiture item details*/}
                <div id='furniture' style={{display:'none' }}>
                <label>
                        Height(cm):
                        <input id='height' type="number" name="height" onChange={handleChange}/>
                        <p>Please, provide height</p>
                        </label><label>
                        Width(cm):
                        <input id='width' type="number" name="width" onChange={handleChange}/>
                        <p>Please, provide width</p>

                        </label><label>
                        lenght(cm):
                        <input id='length' type="number" name="length" onChange={handleChange}/>
                        <p>Please, provide length</p>

                        </label>
                </div> 
                {/* book detail */}
                <div id='book' style={{display:'none'}}>
                <label>
                        Weight(Kg) :
                        <input id='weight' type="text" name="weight" onChange={handleChange}/>
                        <p>Please, provide weight</p>

                        </label>
                </div>
            </div>


        </form>
    </div>

  
  
  </>
  )
}

export default AddProduct