import { imageBaseURL } from '../API/imageBaseUrl';

const SliderControl = ({ sliderItems, activeIndex, onControlClick }) => {
  return (
    <div className='slider-control'>
      <div className='control-inner'>
        {sliderItems.map((movie, controlItemIndex) => {
          const { title, poster_path } = movie;

          const controlClasses = `poster-box slider-item ${
            activeIndex === controlItemIndex ? 'active' : ''
          }`;

          return (
            <button
              key={controlItemIndex}
              className={controlClasses}
              onClick={() => onControlClick(controlItemIndex)}
              slider-control={controlItemIndex}
            >
              <img
                src={`${imageBaseURL}w154${poster_path}`}
                alt={`Slide to ${title}`}
                loading='lazy'
                draggable='false'
                className='img-cover'
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SliderControl;
