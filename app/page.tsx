import Deck from "./_components/Deck";
import { slides } from "./slides";

export default function Home() {
  return (
    <Deck>
      {slides.map((SlideComponent, index) => (
        <SlideComponent key={index} />
      ))}
    </Deck>
  );
}
