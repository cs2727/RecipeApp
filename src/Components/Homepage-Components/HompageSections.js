import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';
import './HomepageSections.css';

function HomepageSections() {
  return (
    <div className="homepageContentContainer">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  );
}

export default HomepageSections;
