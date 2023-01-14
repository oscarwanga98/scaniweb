import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
    const navigate=useNavigate();

    const newId=uuidv4()

    const [formData,setFormData]=useState({
            "specialId":`${newId}`,
            "skuId":`${newId}`,
            "name":"",
            "price":"",
            "productType":"",
            "weight":"",
            "length":"",
            "width":"",
            "height":""
    });
    const CREATE_LINK='http://king1234.onlinewebshop.net/scandiweb/api/create.php'
    

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
        const SIZE=document.getElementById('#size')
        const WEIGHT=document.getElementById('#weight')
        const LEGNTH=document.getElementById('#length')
        const WIDTH=document.getElementById('#width')
        const HEIGHT=document.getElementById('#height')
        
        // eslint-disable-next-line
        if (value==101){
            
            furniture.style.display='none';
            book.style.display='none';
            dvd.style.display='block';
            SIZE.required='true'
           
            
        // eslint-disable-next-line    
        } else if(value==102){
            book.style.display='none';
            dvd.style.display='none';
            furniture.style.display='block';
            LEGNTH.required='true'
            WIDTH.required='true'
            HEIGHT.required='true'
        }else if(value==103){
            book.style.display='block';
            dvd.style.display='none';
            furniture.style.display='none';
            WEIGHT.required='true'
        }
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        
        console.log (formData);

         fetch(CREATE_LINK,{
            method:'POST',
            body:JSON.stringify( formData ),
            headers: {'Content-Type': 'application/json'}
        })
        .then((response)=>{
            console.log(response)
        })
        navigate('/')
    } 



  return (
  <>
    

    
    <div >
        
        <form onSubmit={onSubmit}  ID='product_form'>
            <div className='header'>
            <p>Prodcut Add </p>
            <div className='buttonsHolder'>
                <button className='btn1' type='submit'>Save </button>
            <Link to='/'><button className='btn1'>Cancel</button></Link> 
            </div>            
            </div>

            <div className="line"></div>

            <div className="inputHolder">
                <label >SKU: </label>
                <input id='#sku' ID='sku' type="text" name='skuId' value={formData.skuId} onChange={handleChange} required/>
            </div>

            <div className="inputHolder">
                <label >Name: </label>
                <input ID='name'name='name' type="text" value={formData.name} onChange={handleChange} required/>
            </div>
            <div className="inputHolder">
                <label >price: </label>
                <input ID='price' type="number" name='price' value={formData.price} onChange={handleChange} required/>
            </div>
            <div className="inputHolder">
                <label >Type Switcher : </label>
                <select name="productTypeId" ID="productType" onClick={handleSelection} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="101" text="DVD" ID="DVD" >DVD</option>
                    <option value="102" text="Furniture" ID="Furniture">Furniture</option>
                    <option value="103" text="Book" ID='Book'>Book</option>
                </select>
            </div>

             <div ID='default'>
                {/* DVD item details */}
                <div ID='dvd' style={{display:'none'}}>
                    <div>
                        <label>
                        Size in MB:
                        <input ID= 'size' type="number" name="size" onChange={handleChange} />
                        <p>Please, provide size</p>
                        </label>
                    </div>
                </div> 
                {/* Funiture item details*/}
                <div id='furniture' style={{display:'none' }}>
                <label>
                        Height(cm):
                        <input ID='height' type="number" name="height" onChange={handleChange}/>
                        <p>Please, provide height</p>
                        </label><label>
                        Width(cm):
                        <input ID='width' type="number" name="width" onChange={handleChange}/>
                        <p>Please, provide width</p>

                        </label><label>
                        lenght(cm):
                        <input ID='length' type="number" name="length" onChange={handleChange}/>
                        <p>Please, provide length</p>

                        </label>
                </div> 
                {/* book detail */}
                <div id='book' style={{display:'none'}}>
                <label>
                        Weight(Kg) :
                        <input ID= 'weight' type="text" name="weight" onChange={handleChange}/>
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