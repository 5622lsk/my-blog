import { useState } from 'react'

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <>
      <div className= 'carousel'>
        <ul className='carousel__slides'>
            <input
                type="radio"
                name="radio-buttons"
                id="img-1"
                checked={activeImage === 1}
                readOnly
            />

            <li className='carousel__slide-container'>
                <div className='carousel__slide-img'>
                    <img
                        alt='img1'
                        src='https://images.unsplash.com/photo-1697634236771-ea3df41316f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D' 
                    />
                </div>
                <div className='carousel__controls'>
                    <label
                        onClick={()=> setActiveImage(3)}
                        className='carousel__slide-prev'
                    >
                        <span>&lsaquo;</span>
                    </label>
                    <label
                        onClick={()=>setActiveImage(2)}
                        className='carousel__slide-next'
                    >
                        <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <input
                type="radio"
                name="radio-buttons"
                id="img-2"
                checked={activeImage === 2}
                readOnly
            />
            <li className='carousel__slide-container'>
                <div className='carousel__slide-img'>
                    <img
                        alt='img2'
                        src='https://images.unsplash.com/photo-1705599059814-058b584fe54e?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                </div>
                <div className='carousel__controls'>
                    <label
                        onClick={()=> setActiveImage(3)}
                        className='carousel__slide-prev'
                    >
                        <span>&lsaquo;</span>
                    </label>
                    <label
                        onClick={()=>setActiveImage(2)}
                        className='carousel__slide-next'
                    >
                        <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <input
                type="radio"
                name="radio-buttons"
                id="img-2"
                checked={activeImage === 2}
                readOnly
            />
            <li className='carousel__slide-container'>
                <div className='carousel__slide-img'>
                    <img
                        alt='img-3'
                        src='https://images.unsplash.com/photo-1515496137999-4481e33817d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyNnw2c01WalRMU2tlUXx8ZW58MHx8fHx8' 
                    />
                </div>
                <div className='carousel__controls'>
                    <label
                        onClick={() => setActiveImage(2)}
                        className='carousel__slide-prev'
                    >
                        <span>&lsaquo;</span>
                    </label>
                    <label
                        onClick={() => setActiveImage(1)}
                        className='carousel__slide-next'
                    >
                        <span>&rsaquo;</span>
                    </label>
                </div>
            </li>
            <div className='carousel__dots'>
                <label
                    onClick={() => setActiveImage(1)}
                    className='carousel__dot'
                    id='img-dot-1'
                ></label>
                <label
                    onClick={() => setActiveImage(2)}
                    className='carousel__dot'
                    id='img-dot-2'
                ></label>
                <label
                    onClick={() => setActiveImage(3)}
                    className='carousel__dot'
                    id='img-dot-3'
                ></label>
            </div>
        </ul> 
      </div>
    </>
  )
}
