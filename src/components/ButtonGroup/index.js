import React, { useState, useEffect } from 'react';
/* Components */
import Button from '../Button';

const ButtonGroup = ({ settings, updateCurrentPage }) => {
  const { currentPage, totalPages, labels, amountToShow, showStartButton, showEndButton } = settings;
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
        buttons.push(<Button className={`pagination__button ${i === currentPage ? "pagination__button--is-active" : ""}`} text={labels[i]} clickEvent={() => updateCurrentPage(i)} />);
      }

      if (currentPage !== 1 && showStartButton) {
        buttons.unshift(<Button className={`pagination__button`} text="Start" clickEvent={() => updateCurrentPage(1)} />);
      }

      if (currentPage !== totalPages && showEndButton) {
        buttons.push(<Button className={`pagination__button`} text="End" clickEvent={() => updateCurrentPage(totalPages)} />);
      }

      setButtons(buttons);
    }
  }

  useEffect(function () {
    renderButtons(currentPage, totalPages, amountToShow);
  }, [currentPage, totalPages, labels])

  return (
    <section>
      {buttons}
    </section>
  );
}

export default ButtonGroup;
