import { useEffect } from 'react'
import gsap from 'gsap'
import styles from '@/styles/Misc.module.css'

export default function Eyes() {

  useEffect(()=> {
    const box = document.getElementById('eye-container')
    const img = document.getElementById('el')            // now the <img>
    const bgText = document.getElementsByClassName(styles['bg-text'])[0]

    if (!box || !img || !bgText) return

    let mouseX, mouseY

    // mouse move handler (throttled)
    const mouseHandler = throttled(16, function(e){
      // center-based offsets
      mouseX = ( box.clientWidth/2 - e.offsetX ) * 0.06
      mouseY = ( box.clientHeight/2 - e.offsetY ) * 0.07

      // move the image and the bg text for parallax
      gsap.to(img, { duration: 0.5, x: -mouseX * 2, y: -mouseY * 2, ease: 'power3.out' })
      gsap.to(bgText, { duration: 0.5, x: mouseX * 0.5, y: mouseY * 0.5, ease: 'power3.out' })
    })

    box.addEventListener('mousemove', mouseHandler)

    // device orientation (gyro) handler - throttled wrapper
    const gyroHandler = throttled(100, (e) => {
      // a gentle mapping from device orientation to movement
      const beta = e.beta || 0    // front/back tilt
      const gamma = e.gamma || 0  // left/right tilt

      // create small offsets from tilt
      const left = gamma * 6 - box.clientWidth / 2
      const top = beta * 3 - box.clientHeight / 2

      // animate to new positions
      gsap.to(img, { duration: 0.5, x: left * 0.02, y: top * 0.02, ease: 'power3.out' })
      gsap.to(bgText, { duration: 0.5, x: -left * 0.2, y: -top * 0.2, ease: 'power3.out' })
    })

    window.addEventListener('deviceorientation', gyroHandler)

    // cleanup
    return () => {
      box.removeEventListener('mousemove', mouseHandler)
      window.removeEventListener('deviceorientation', gyroHandler)
    }
  }, [])

  // simple throttle used above
  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  return(
    <div className={`${styles['eyes-container']} misc-anim`} id='eye-container'>

      {/* Replace the CSS eye with an image. Put the file in /public/plane.png */}
      <img
        id="el"
        src="/plane.png"
        alt="plane"
        className={styles.plane}
        draggable={false}
        style={{ width: "220px", height: "auto" }}
      />

      <div className={styles['bg-text']}
      style={{     
        transform: "translate(-50%, -50%)",
        zIndex: -1,          // <-- puts text behind image
        opacity: 0.2,        // optional (looks cleaner behind)
        pointerEvents: "none"
      }}>
        ASPIRE
      </div>

    </div>
  )
}
