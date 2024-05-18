import React,{useState} from 'react'
import { BsArrowLeftCircleFill,BsArrowRightCircleFill } from 'react-icons/bs';
export const Carousel = ({data}) => {
   console.log(data);
   const [slide,setSlide]=useState(0);
   const nextSlide=()=>{
    setSlide(slide===data.length-1?0:slide+1);
   }
   const prevSlide=()=>{
    setSlide(slide===0?data.length-1:slide-1);
   }
  return (
    <div className="container">
    <div className='imgg'>
      <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide}/>{data.map((item,idx)=>{
      return <img className={slide===idx?"slidee":"slidee slide-hidden"} src={item.src} alt={item.alt} key={idx} />
    })}
    <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide}/>
    </div>
    <div className="cont">
      <h1>Welcome to GovBot</h1>
      <h3>Making schemes easier to find.</h3>
    </div>
    </div>
  )
}
