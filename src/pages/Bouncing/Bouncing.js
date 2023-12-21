import { useEffect, useRef, useState } from "react"
import { Circle } from "./classes/Circle";
import { config } from "./config";
import { Rect } from "./classes/Rect";

export const Bouncing = () => {
    let canvasRef = useRef(null);

    const [shapes, setShapes] = useState(null);
    
    useEffect(() => {
        let cnv = canvasRef?.current;
        let ctx = cnv?.getContext('2d');

        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;

        const animate = () => {
            requestAnimationFrame(animate);
        
            if (ctx && cnv) {
                ctx.clearRect(0, 0, cnv.width, cnv.height);

                if (shapes && shapes.length) {
                    shapes.forEach(shape => {
                        shape.update(cnv.width, cnv.height);
                        shape.draw(ctx);
                    })
                }
    
            }
            
        }

        animate();

        window.addEventListener('resize', () => {
            cnv.width = window.innerWidth;
            cnv.height = window.innerHeight;

            console.log({ w: cnv.width, h: cnv.height })
        })
    }, [shapes]);

    useEffect(() => {
        if (config) {

            let shapes = [];
            config.forEach(shape => {
                // console.log(shape, 'shape');

                if (shape.name === 'Circle') {
                    const newCircle = new Circle(shape);
                    shapes = [...shapes, newCircle];
                }

                if (shape.name === 'Rectangle') {
                    const newRect = new Rect(shape);
                    shapes = [...shapes, newRect];
                }

            });
            setShapes(shapes);
        }
    }, [config]);


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