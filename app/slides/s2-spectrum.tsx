import Slide from '../_components/Slide';
import Spectrum3DSlide from '../_components/Spectrum3DSlide';

export default function Slide2() {
  return (
    <Slide className="!p-0"> {/* Remove padding to allow full canvas */}
      <Spectrum3DSlide />
    </Slide>
  );
}
