import { initDeck } from "../../src/runtime/deck.js";
import "../../src/styles/base.css";
import "../../src/styles/components.css";
import "../../src/styles/layouts.css";
import "../../src/styles/print.css";

const deck = initDeck();
deck.showSlide(deck.currentSlide);
