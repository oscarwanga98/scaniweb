import React from 'react'
import { useEffect } from 'react'

function Card({product,addList}) {

  const handleClick=(e)=>{
    
    const newData=product.specialId
    addList(newData)
    }
    
    const pType=product.productTypeId
    
    
  return (
    

        
        <div className='card'>
            <input type="checkbox" onClick={handleClick} className="delete-checkbox"  />
            
            
            <div>SKU:{product.skuId}</div>
            <div>{product.name}</div>
            <div>{product.price} $</div>
            {/* <div>{product.productType}</div> */}
            <div style={{display: pType==101 ? 'block' : 'none'}} >Size: {product.size}</div>
            <div style={{display: pType==102 ? 'block' : 'none'}}>Weight: {product.weight}</div>
            <div style={{display: pType==103 ? 'block' : 'none'}}>Dimensions: {product.length}x{product.width}x{product.height}</div>
            
            
        </div>

    
  )
  
}

export default Card