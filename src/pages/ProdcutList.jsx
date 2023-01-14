import React from 'react'
import { useEffect,useState} from 'react'
import axios from 'axios'
import Card from '../components/Card'

import {Link} from 'react-router-dom'



function ProdcutList() {
    
    const deleteL=[]
    const addList =(data)=>{
    deleteL.push(data)
    console.log(deleteL)
    }

    const READ_LINK='http://king1234.onlinewebshop.net/scandiweb/api/read.php'
    
    const DELETE_LINK='http://king1234.onlinewebshop.net/scandiweb/api/delete.php'
    
    function massDelete(){
        axios.delete(DELETE_LINK,{
            data:deleteL,
			headers: {
				"Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
			}
		}).then(()=>{
            const refresh = () => window.location.reload(true)
            if (deleteL>0){
                refresh()
            }
            
        })
       
        
        
    }

    const [prodcuts,setProdcuts]=useState([])

    function getProdcuts(){
       
        axios.get(READ_LINK,{
			headers: {
				"Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
			}
		})
        .then((response)=>{
            // console.log(response.data.data)
            setProdcuts(response.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    } ; 
     useEffect(()=>{

        getProdcuts()

    },[]);
    
    const listItems =prodcuts.map(product=>(
        <Card  key={prodcuts.specialId} addList={addList} product={product}/>
    ));


  return (
    <>
        <div className='header'>
            <p>Product List </p>
            <div className='buttonsHolder'>
                <Link to='/add-product'><button id='ADD'Text='ADD'>ADD</button></Link>
                <button className='btn1' onClick={massDelete} ID='#delete-product-btn'>MASS DELETE</button>
            </div>            
        </div>
        <div className="line"></div>

        <div className='container'>

            {listItems}
            
        </div >
    </>
  )
}
export default ProdcutList