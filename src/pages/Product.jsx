import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');

  const fetchProductData = async () => {

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])        
        return null;
      }
    })
  }

  useEffect(()=>{
      fetchProductData();
  },[productId, products])


  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* product img */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, index)=>(
                  <img className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={()=>setImage(item)} src={item} key={index} alt="" />
                ))
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>

        {/* product information */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
                <img className="w-3 5" src={assets.star_icon} alt="" />
                <img className="w-3 5" src={assets.star_icon} alt="" />
                <img className="w-3 5" src={assets.star_icon} alt="" />
                <img className="w-3 5" src={assets.star_icon} alt="" />
                <img className="w-3 5" src={assets.star_dull_icon} alt="" />
                <p className='pl-2'>(205)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col my-8'>
                <p className='pb-4'>Select Color</p>
                <div className='flex gap-2'>
                  {productData.colors.map((item, index)=>( 
                    <button className={`border py-2 px-4 bg-gray-100 ${item === color ? 'border-orange-500' : ''}`} onClick={()=>setColor(item)} key={index}>{item}</button>
                  ))}
                </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>addToCart(productData._id, color)}>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product</p>
              <p>Cash on delivery is not available for this product.</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
        </div> 
      </div>
      {/* description section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Discount terms</b>
          <p className='border px-5 py-3 text-sm'>Reviews (205)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-gray-500'>
            <p>Where an online offer states that a discount is given on a purchase up to a stated percentage, the discount given will only be applicable to qualifying products and the percentage of discount given will vary between qualifying products.</p>
            <p>Supplementary charges such as delivery or postage & packing shall not be discounted unless specifically stated in the promotion description.
            Refunds for goods purchased under a promotional offer will be based on the terms of the promotional price. Your statutory rights are not affected.</p>      
        </div>
      </div>

      {/* related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
