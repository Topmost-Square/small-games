import { useEffect, useRef } from "react"

export const Bouncing = () => {
    let canvasRef = useRef(null);
    
    useEffect(() => {
        let newCanvas = canvasRef?.current;
        let newContext = newCanvas?.getContext('2d');

        newCanvas.width = window.innerWidth;
        newCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            newCanvas.width = window.innerWidth;
            newCanvas.height = window.innerHeight;

            console.log({ w: newCanvas.width, h: newCanvas.height })
        })
    }, []);


    return (
        <div>
            Bouncing
            <canvas 
                ref={canvasRef}
                style={{ background: "grey" }}
            >

            </canvas>
        </div>
    )
}