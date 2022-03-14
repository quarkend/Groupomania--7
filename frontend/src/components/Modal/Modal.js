// import React from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";

// // Components


// //Styles
// import styles from "./Modal.module.css";

// const ModalOverlay = (props) => {
//     const content = (
//         <div className={`${styles.modal} ${props.className}`} style={props.style}>
//             {/* <header className={`${styles.modal__header} ${props.headerClass}`}>
//                 <h2>{props.header}</h2>
//             </header> */}
//             <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
//                 <div className={`${styles.modal__content} ${props.contentClass}`}>{props.children}</div>
//                 <footer className={`${styles.modal__footer} ${props.footerClass}`}>{props.footer}</footer>
//             </form>
//         </div>
//     );
//     return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
// };

// const Modal = (props) => {
//     return (
//         <>
//             {props.show && <button onClick={props.onCancel} />}
//             <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={10} classNames={styles.modal}>
//                 <ModalOverlay {...props} />
//             </CSSTransition>
//         </>
//     );
// };

// export default Modal;
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="card">
 
                <div className="card">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="card">{props.children}</div>
              </div>
       
     

          <style jsx="true">{`



     


          `}</style>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
