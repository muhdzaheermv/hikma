import { useState, useEffect } from 'react'
import styles from '@/styles/Misc.module.css'

export default function HindiText(){

    let hindiLetters = ['हिक्','मा','यू','नि','यन'];


    //For Hindi speed ramp
    useEffect(() => {
        let to = 0
        let box = document.querySelectorAll('#flame-of-ragam')[0]
        box.addEventListener('mouseenter', function(e) {
            let i = 0;
            to = setInterval(()=> {
                let text = document.querySelectorAll('#hindi-text-switch')[0]
                text.style.transform = 'scale(1.85)'
                text.innerHTML=hindiLetters[i]
                i = (i+1)%5
            },150)
        })

        box.addEventListener('mouseleave',function(){
            clearInterval(to)
            let text = document.querySelectorAll('#hindi-text-switch')[0]
            text.style.transform = 'scale(1)'
            text.innerHTML='हिक्मा यूनियन'
        })
    },[])


    return(
        <div className={`${styles['flame-of-ragam'] } misc-anim`} id="flame-of-ragam">
            <p className={styles['hindi-text']} id='hindi-text-switch'>
                {/* Fix uncentered hindi text */}
                हिक्मा यूनियन
            </p>
        </div>
    )
}