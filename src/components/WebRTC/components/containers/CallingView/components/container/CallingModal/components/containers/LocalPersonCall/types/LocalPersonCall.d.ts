interface LocalPersonCallProps {
  stream?: MediaStream;
  camera?: boolean;
  microphone?: boolean;
}

type LocalPersonCallAnimateState = "expanded" | "collapsed";

interface LocalPersonCallAnimate<T> {
  Container: T;
}
