import  styles from '../../styles/Footer.module.css'

const GetInTouch = ({email}) => {
  return (
    <a  href='muhdzaheermv@gmail.com'    className={`${styles.getInTouchContainer}`}>
        <div    className={`${styles.transition}    ${styles.overlay}`}></div>
        <div    className={`${styles.getInTouch}`}>Developed by</div>
        <div    className={`${styles.email}`}>{email}</div>
    </a>
  )
}

export default GetInTouch