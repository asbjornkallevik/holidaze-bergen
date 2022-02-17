import { useEffect } from "react";

// Spinning circle – made by Asbjørn Kallevik
//-------------------------------------------
// Customize the spinning circle here.
// It will alternate between all colors specified in the properties object.
// MAKE DESIRED CHANGES HERE:
const properties = {
  colors: ["#513580", "#f3edff"], // Specify one or more colors
  lineWidth: 0.4, // A number between 0.0 and 1.0
  velocity: 6, // Animation interval specified in milliseconds
};
//-------------------------------------------

export default function Spinner() {
  useEffect(() => {
    const canvas = document.querySelector("#canvas");

    if (canvas.getContext) {
      const ctx = canvas.getContext("2d"),
        width = ctx.canvas.width,
        height = ctx.canvas.height,
        xCenter = width / 2,
        yCenter = height / 2,
        lineWidth = (height / 2) * properties.lineWidth,
        radius = yCenter - lineWidth / 2,
        colors = properties.colors;

      let sAng = 1.5,
        eAng = 1.5,
        cycle = 0;

      // Update cycle to change colors within the colors array
      function updateCycle() {
        if (cycle === colors.length - 1) {
          cycle = 0;
        } else {
          cycle++;
        }
      }

      function setAngles() {
        // Increment start and end angles
        if (eAng <= 3.5) {
          eAng = eAng + 0.01;
        } else if (sAng <= 3.5) {
          sAng = sAng + 0.01;
        } else {
          // Reset angles
          sAng = 1.5;
          eAng = 1.5;
          // Update cycle
          updateCycle();
        }
        return {
          sAng: sAng,
          eAng: eAng,
        };
      }

      function circle() {
        // Increment start and end angles
        sAng = setAngles().sAng;
        eAng = setAngles().eAng;

        ctx.strokeStyle = colors[cycle];

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.arc(xCenter, yCenter, radius, Math.PI * sAng, Math.PI * eAng);
        ctx.stroke();
      }

      //Animate circle
      let animate = setInterval(circle, properties.velocity);
    } else {
      console.error(
        "The loading symbol could not load, because HTML Canvas is not supported in your browser"
      );
    }
  }, []);

  return (
    <canvas id="canvas" width={200} height={200}>
      Loading...
    </canvas>
  );
}
