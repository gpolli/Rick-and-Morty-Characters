import React, { useState, useEffect } from 'react';
/* Assets */
import double_chevron from '../../assets/images/double_chevron.png';
/* Components */
import Button from '../Button';
/* Style */
import './style.css';

const ButtonGroup = ({ parentClass, settings, updateCurrentPage }) => {
  const { currentPage, totalPages, labels, amountToShow, showStartButton, showEndButton, styleModifiers } = settings;
  // const { position, size, shape } = styleModifiers;
  const [buttons, setButtons] = useState([]);

  function renderButtons(currentPage, totalPages, amountToShow) {
    if (labels) {
      let buttons = [];
      let leftLimit = currentPage - Math.floor(amountToShow / 2);
      let rightLimit = currentPage + Math.floor(amountToShow / 2);

      if (leftLimit < 1) {
        leftLimit = 1;
        rightLimit = amountToShow;

        if (rightLimit > totalPages) {
          rightLimit = totalPages;
        }
      }

      if (rightLimit > totalPages) {
        leftLimit = totalPages - (amountToShow - 1);
        rightLimit = totalPages;

        if (leftLimit < 1) {
          leftLimit = 1;
        }
      }

      for (let i = leftLimit; i <= rightLimit; i++) {
        buttons.push(<Button className={`${i === currentPage ? "button--is-active" : ""}`} text={labels[i]} clickEvent={i !== currentPage ? () => updateCurrentPage(i) : function () { }} />);
      }

      if (showStartButton) {
        buttons.unshift(<Button disabled={currentPage === 1} clickEvent={() => updateCurrentPage(1)}><img className="button__icon button__icon--reverse-direction" src={double_chevron} alt="Double chevron left" /></Button>);
      }

      if (showEndButton) {
        buttons.push(<Button disabled={currentPage === totalPages} clickEvent={() => updateCurrentPage(totalPages)}><img className="button__icon" src={double_chevron} alt="Double chevron right" /></Button>);
      }

      setButtons(buttons);
    }
  }

  useEffect(function () {
    renderButtons(currentPage, totalPages, amountToShow);
  }, [currentPage, totalPages, labels])

  return (
    <section className={`${parentClass ? parentClass : ''} button-group ${styleModifiers?.size ? (`button-group--${styleModifiers.size}`) : ''} ${styleModifiers?.buttonWidth ? (`button-group--button-width-${styleModifiers.buttonWidth}`) : ''}`}>
      {buttons}
    </section>
  );
}

export default ButtonGroup;
