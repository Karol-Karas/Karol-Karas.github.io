import React, {Component} from "react";
import { MasterSoundAndVol } from "./MasterSoundAndVol";

interface AppProps {}

interface AppState {}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <MasterSoundAndVol/>
      </div>
    );
  }
}
