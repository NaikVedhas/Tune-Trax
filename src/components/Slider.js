import { useEffect, useState } from 'react';
import '../css/slider.css';

const Slider = () => {

    const [counter , setcounter] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setcounter((prevcounter) => {
          let newcounter = prevcounter + 1;
          if (newcounter > 5) {
            newcounter = 1;
          }
          return newcounter;
        });
      }, 5000); 

      return () => clearInterval(interval);
    }, []);
    

    useEffect(()=>{
    document.getElementById('radio' + counter).checked = true; 
    },[counter])


  return (
    <>
      <div className="slider-conatiner">
        {/* imgage slide starts  */}
        <div className="slider">
          <div className="slides">
            {/* radio button starts */}
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <input type="radio" name="radio-btn" id="radio4" />
            <input type="radio" name="radio-btn" id="radio5" />
            {/* radio button ends */}

            {/* slide image starts  */}
            <div className="slide first">
              <img
                src="https://res.cloudinary.com/dm9axcf83/image/upload/v1708781352/img5_t1fbdt.jpg"
                alt="img1"
              />
            </div>
            <div className="slide">
              <img
                src="https://res.cloudinary.com/dm9axcf83/image/upload/v1708782686/img6_bkitct.jpg"
                alt="img2"
              />
            </div>
            <div className="slide">
              <img
                src="https://res.cloudinary.com/dm9axcf83/image/upload/v1708782004/IMG2_sat8ga.jpg"
                alt="img3"
              />
            </div>
            <div className="slide">
              <img
                src="https://res.cloudinary.com/dm9axcf83/image/upload/v1708781697/img4_g0vtuo.jpg"
                alt="img4"
              />
            </div>
            <div className="slide">
              <img
                src="https://res.cloudinary.com/dm9axcf83/image/upload/v1708781530/Fresh_Talent_agiuto.png"
                alt="img5"
              />
            </div>
            {/* slide imgaes ends  */}
          </div>
          {/* image slider ends  */}

          {/* automatic navigtion starts  */}
          <div className="navigation-auto">
            <div className="auto-btn1"></div>
            <div className="auto-btn2"></div>
            <div className="auto-btn3"></div>
            <div className="auto-btn4"></div>
            <div className="auto-btn5"></div>
          </div>
          {/* automatic navigation ends  */}

          {/* manual navigation starts  */}
          <div className="navigation-manual">
            <label htmlFor="radio1" className="manual-btn"></label>
            <label htmlFor="radio2" className="manual-btn"></label>
            <label htmlFor="radio3" className="manual-btn"></label>
            <label htmlFor="radio4" className="manual-btn"></label>
            <label htmlFor="radio5" className="manual-btn"></label>
          </div>
          {/* manual navigaion ends  */}
        </div>
      </div>
    </>
  );
}

export default Slider;

