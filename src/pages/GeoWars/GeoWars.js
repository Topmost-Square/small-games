import { useEffect, useRef } from "react";
import { Game } from "./classes/Game";

export const GeoWars = () => {
    let canvasRef = useRef(null);

    useEffect(() => {
        let cnv = canvasRef?.current;
        let ctx = cnv?.getContext('2d');

        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;

        const game = new Game();
        game.init(cnv, ctx);

        const animate = () => {
            requestAnimationFrame(animate);
        
            if (ctx && cnv) {
                ctx.clearRect(0, 0, cnv.width, cnv.height);
                
                game.run();
            }
            
        }

        animate();

        window.addEventListener('resize', () => {
            cnv.width = window.innerWidth;
            cnv.height = window.innerHeight;

            console.log({ w: cnv.width, h: cnv.height })
        })
    }, []);

    return (
        <div>
            GeoWars
            <canvas 
                ref={canvasRef}
                style={{ background: "grey" }}
            >

            </canvas>
        </div>
    )
}