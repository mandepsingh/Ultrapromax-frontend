import React, { useState, CSSProperties} from 'react'
import { BeatLoader, ScaleLoader } from 'react-spinners';

function Loader() {
    return (
        <ScaleLoader
        color="#36d7b7"
        size={10}
        cssOverride={{}}
        loading
        margin={5}
        speedMultiplier={1}
        />
    );
}

export default Loader
