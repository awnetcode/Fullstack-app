import './Button.css';

// eslint-disable-next-line react/prop-types
const Button = ({action, content}) => {
    return(
        <button className='form-button' onClick={action}>{content}</button>
    )
}

export default Button;