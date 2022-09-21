import image1 from '../../Images/image-1.png';
import image2 from '../../Images/image-2.png';
import image3 from '../../Images/image-3.png';
import classes from './FirstSection.module.css';
import { useRef } from 'react';

function FirstSection() {
  // Image Elements References
  const firstImage = useRef();
  const secondImage = useRef();
  const thirdImage = useRef();
  const figureElement = useRef();

  // List Items

  const firstItem = useRef();
  const secondItem = useRef();
  const thirdItem = useRef();

  function toggleImages(event) {
    const removingImages = [];
    const selectedItem = [];

    if (event.target.attributes[0].nodeValue === 'first-Item') {
      removingImages.push(
        firstImage.current,
        secondImage.current,
        thirdImage.current
      );
      selectedItem.push(
        firstItem.current,
        secondItem.current,
        thirdItem.current
      );
    } else if (event.target.attributes[0].nodeValue === 'second-Item') {
      removingImages.push(
        secondImage.current,
        firstImage.current,
        thirdImage.current
      );
      selectedItem.push(
        secondItem.current,
        firstItem.current,
        thirdItem.current
      );
    } else {
      removingImages.push(
        thirdImage.current,
        firstImage.current,
        secondImage.current
      );
      selectedItem.push(
        thirdItem.current,
        firstItem.current,
        secondItem.current
      );
    }

    for (let i = 0; i < removingImages.length; i++) {
      if (i === 0) {
        removingImages[i].style.display = 'block';
        selectedItem[i].style.backgroundColor = 'blue';
      } else {
        removingImages[i].style.display = 'none';
        selectedItem[i].style.backgroundColor = 'white';
      }
    }

    figureElement.current.style.animation = 'none';
  }

  return (
    <section className={classes.firstSectionContainer}>
      <div className={classes.slider}>
        <figure ref={figureElement}>
          <img src={image1} ref={firstImage} alt="slideshow first image" />
          <img src={image2} ref={secondImage} alt="slideshow second image" />
          <img src={image3} ref={thirdImage} alt="slideshow third image" />
        </figure>
      </div>
      <ul className={classes.toggleSlider}>
        <li val="first-Item" onClick={toggleImages} ref={firstItem}></li>
        <li val="second-Item" onClick={toggleImages} ref={secondItem}></li>
        <li val="third-Item" onClick={toggleImages} ref={thirdItem}></li>
      </ul>
    </section>
  );
}

export default FirstSection;
